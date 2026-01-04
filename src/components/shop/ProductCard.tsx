import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/shop";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-3">
        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
          {product.category}
        </Badge>
        <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
        <p className="text-primary font-bold text-xl">₹{product.price.toFixed(2)}</p>
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full gap-2 bg-primary hover:bg-primary/90"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
