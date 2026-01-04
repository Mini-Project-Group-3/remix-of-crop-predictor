import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CartSheet from "./CartSheet";
import { CartItem } from "@/types/shop";

interface ShopNavbarProps {
  cartItems: CartItem[];
  isCartOpen: boolean;
  onCartOpenChange: (open: boolean) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const shopNavLinks = [
  { to: "/shop", label: "Home" },
  { to: "/shop/products", label: "Shop" },
];

const ShopNavbar = ({
  cartItems,
  isCartOpen,
  onCartOpenChange,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  totalItems,
  totalPrice,
}: ShopNavbarProps) => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/shop" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-full bg-primary/10 p-2"
            >
              <Leaf className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="font-bold text-lg text-primary">
              AgriStore
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {shopNavLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="shop-navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <CartSheet
              cartItems={cartItems}
              isOpen={isCartOpen}
              onOpenChange={onCartOpenChange}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveFromCart}
              onClear={onClearCart}
              totalItems={totalItems}
              totalPrice={totalPrice}
            />
            <Link to="/home">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default ShopNavbar;
