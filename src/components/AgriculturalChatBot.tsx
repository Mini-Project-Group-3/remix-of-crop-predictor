import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Send, Leaf, ArrowUp, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  segments?: Array<{
    type: 'climate' | 'yield' | 'advisory' | 'nutrition' | 'schemes';
    title: string;
    content: string;
    icon: string;
  }>;
}

interface AgriculturalChatBotProps {
  onStartPrediction: () => void;
}

const AgriculturalChatBot = ({ onStartPrediction }: AgriculturalChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load conversation from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('agri-chat-history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initial greeting
      const initialMessage: Message = {
        id: '1',
        text: "Welcome! I'm Agri-Assistant. I can help you understand our yield prediction tool. What's your first question?",
        isBot: true,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, []);

  // Save conversation to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('agri-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const scrollToStartButton = () => {
    const startButton = document.querySelector('[data-start-prediction]');
    if (startButton) {
      startButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Fallback: scroll to hero section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleQuickReply = (type: string) => {
    let responseText = "";
    
    switch (type) {
      case 'start':
        scrollToStartButton();
        onStartPrediction();
        return;
      case 'how-it-works':
        responseText = "Our yield prediction tool works in 5 simple steps:\n\n🎯 **Step 1**: Enter your location (District & Taluka)\n🌱 **Step 2**: Provide soil details (color, pH, nutrients)\n🧪 **Step 3**: Select fertilizer type\n🌧️ **Step 4**: Input rainfall and temperature data\n🌾 **Step 5**: Choose your crop type\n\nOur AI analyzes all these factors to give you accurate yield predictions with actionable insights!";
        break;
      case 'data-needed':
        responseText = "Here's what data you'll need to provide:\n\n📍 **Location**: District and Taluka\n🌱 **Soil Info**: Color, pH level, Nitrogen, Phosphorus, Potassium\n🧪 **Fertilizer**: Type of fertilizer used\n🌧️ **Weather**: Rainfall amount, minimum & maximum temperature\n🌾 **Crop**: Type of crop you want to grow\n\nDon't worry if you don't have exact values - estimates work too!";
        break;
      default:
        responseText = "I'm here to help! Feel free to ask me anything about yield prediction.";
    }

    addBotMessage(responseText);
  };

  const addBotMessage = (text: string, segments?: Message['segments']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      segments
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const fetchBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();
      addBotMessage(data.response || data.reply || data.text || "I received your message but couldn't process a response.");
    } catch (error) {
      console.error('Chatbot API error:', error);
      addBotMessage("Sorry, I'm having trouble connecting right now. Please try again later.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addUserMessage(userMessage);
    setInputValue("");

    // Get response from NLP chatbot API
    await fetchBotResponse(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Launcher */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-bounce-subtle"
          size="icon"
        >
          <Leaf className="h-8 w-8 text-primary-foreground" />
        </Button>
      )}

      {/* Chat Window - Modern Lovable Style */}
      {isOpen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-5xl bg-background border border-border/50 shadow-2xl animate-slide-in-bottom rounded-2xl overflow-hidden backdrop-blur-xl">
          {/* Header Bar */}
          <div className="bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-foreground">Agri-Assistant</h3>
                <p className="text-xs text-muted-foreground">Your farming companion</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Container */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background to-accent/5">
            {messages.map((message) => (
              <div key={message.id} className={cn(
                "flex gap-3 animate-fade-in",
                message.isBot ? "justify-start" : "justify-end"
              )}>
                {message.isBot && (
                  <div className="flex-shrink-0 mt-1">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Leaf className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                )}
                <div className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
                  message.isBot 
                    ? "bg-card border border-border text-foreground rounded-tl-sm" 
                    : "bg-primary text-primary-foreground rounded-tr-sm"
                )}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  
                  {/* Segmented Response */}
                  {message.segments && (
                    <div className="mt-4 space-y-2">
                      {message.segments.map((segment, index) => (
                        <div key={index} className="bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border/50">
                          <div className="font-semibold text-xs text-primary flex items-center gap-2 mb-1.5">
                            <span>{segment.icon}</span>
                            {segment.title}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {segment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex-shrink-0 mt-1">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Leaf className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions - Shown only initially */}
            {messages.length <= 2 && !isTyping && (
              <div className="flex flex-wrap gap-2 justify-center pt-4 animate-fade-in">
                <Button
                  onClick={() => handleQuickReply('start')}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary"
                >
                  <ArrowUp className="h-3 w-3 mr-2" />
                  Start Prediction
                </Button>
                <Button
                  onClick={() => handleQuickReply('how-it-works')}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary"
                >
                  How it works
                </Button>
                <Button
                  onClick={() => handleQuickReply('data-needed')}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary"
                >
                  Data needed
                </Button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="flex gap-3 items-end">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crops, irrigation, fertilizers..."
                className="flex-1 rounded-xl border-border/50 focus-visible:ring-primary/50 bg-background"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage}
                size="icon"
                className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 shadow-sm"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgriculturalChatBot;