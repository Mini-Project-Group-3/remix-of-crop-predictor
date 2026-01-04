import { Routes, Route, Navigate } from "react-router-dom";
import ShopNavbar from "@/components/shop/ShopNavbar";
import ShopHomePage from "./ShopHomePage";
import ShopProductsPage from "./ShopProductsPage";
import { useCart } from "@/hooks/useCart";

const ShopLayout = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <>
      <ShopNavbar
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onCartOpenChange={setIsCartOpen}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
      <Routes>
        <Route index element={<ShopHomePage />} />
        <Route path="products" element={<ShopProductsPage onAddToCart={addToCart} />} />
        <Route path="*" element={<Navigate to="/shop" replace />} />
      </Routes>
    </>
  );
};

export default ShopLayout;
