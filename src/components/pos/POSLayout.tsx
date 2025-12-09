import { useState, useCallback } from "react";
import { Product } from "@/data/products";
import { CartItem } from "@/types/cart";
import { useToast } from "@/hooks/use-toast";
import WelcomeScreen from "./WelcomeScreen";
import ProductsScreen from "./ProductsScreen";
import CheckoutScreen from "./CheckoutScreen";

type Screen = "welcome" | "products" | "checkout";

const POSLayout = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [cashierName, setCashierName] = useState("");
  const [items, setItems] = useState<CartItem[]>([]);
  const [exitingScreen, setExitingScreen] = useState<Screen | null>(null);
  const { toast } = useToast();

  // Handle screen transitions with fade effect
  const transitionTo = (screen: Screen) => {
    setExitingScreen(currentScreen);
    setTimeout(() => {
      setCurrentScreen(screen);
      setExitingScreen(null);
    }, 400);
  };

  // Sign in handler
  const handleSignIn = (username: string) => {
    setCashierName(username);
    transitionTo("products");
    toast({
      title: `Welcome, ${username}!`,
      description: "Ready to start selling",
      duration: 2000,
    });
  };

  // Add item to cart
  const addItem = useCallback(
    (product: Product) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            icon: product.icon,
          },
        ];
      });

      toast({
        title: `${product.name} added`,
        description: `$${product.price.toFixed(2)}`,
        duration: 1500,
      });
    },
    [toast]
  );

  // Add custom item
  const addCustomItem = useCallback(
    (name: string, price: number) => {
      const id = `custom-${Date.now()}`;
      setItems((prev) => [
        ...prev,
        { id, name, price, quantity: 1, icon: "📦" },
      ]);

      toast({
        title: `${name} added`,
        description: `$${price.toFixed(2)}`,
        duration: 1500,
      });
    },
    [toast]
  );

  // Update item quantity
  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Remove item
  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Complete sale
  const completeSale = useCallback(() => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    toast({
      title: "Sale Completed! 🎉",
      description: `Total: $${total.toFixed(2)}`,
      duration: 3000,
    });
    setItems([]);
    transitionTo("products");
  }, [items, toast]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Welcome Screen */}
      {(currentScreen === "welcome" || exitingScreen === "welcome") && (
        <div
          className={`absolute inset-0 z-30 ${
            exitingScreen === "welcome" ? "tab-screen-exit" : "tab-screen-enter"
          }`}
        >
          <WelcomeScreen onSignIn={handleSignIn} />
        </div>
      )}

      {/* Products Screen */}
      {(currentScreen === "products" || exitingScreen === "products") && (
        <div
          className={`absolute inset-0 z-20 ${
            exitingScreen === "products"
              ? "tab-screen-exit"
              : "tab-screen-enter"
          }`}
        >
          <ProductsScreen
            items={items}
            onAddItem={addItem}
            onAddCustomItem={addCustomItem}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onProceedToCheckout={() => transitionTo("checkout")}
          />
        </div>
      )}

      {/* Checkout Screen */}
      {(currentScreen === "checkout" || exitingScreen === "checkout") && (
        <div
          className={`absolute inset-0 z-10 ${
            exitingScreen === "checkout"
              ? "tab-screen-exit"
              : "tab-screen-enter"
          }`}
        >
          <CheckoutScreen
            items={items}
            onBack={() => transitionTo("products")}
            onCompleteSale={completeSale}
            cashierName={cashierName}
          />
        </div>
      )}
    </div>
  );
};

export default POSLayout;