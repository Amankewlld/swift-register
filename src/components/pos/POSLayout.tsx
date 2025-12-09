import { useState, useRef, useCallback } from "react";
import { Product } from "@/data/products";
import { CartItem } from "@/types/cart";
import { useToast } from "@/hooks/use-toast";
import ProductGrid from "./ProductGrid";
import CustomItemForm from "./CustomItemForm";
import CartSection from "./CartSection";
import DiscountInput from "./DiscountInput";
import PaymentSection from "./PaymentSection";
import TotalDisplay from "./TotalDisplay";
import ActionButtons from "./ActionButtons";
import Receipt from "./Receipt";
import { ShoppingCart } from "lucide-react";

const POSLayout = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const receiptRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;
  const change = amountPaid - total;

  // Add item to cart
  const addItem = useCallback((product: Product) => {
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
  }, [toast]);

  // Add custom item
  const addCustomItem = useCallback((name: string, price: number) => {
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
  }, [toast]);

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

  // Clear cart
  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountPercent(0);
    setAmountPaid(0);
  }, []);

  // Print receipt
  const printReceipt = useCallback(() => {
    window.print();
  }, []);

  // Complete sale
  const completeSale = useCallback(() => {
    toast({
      title: "Sale Completed! 🎉",
      description: `Total: $${total.toFixed(2)} | Change: $${change.toFixed(2)}`,
      duration: 3000,
    });
    clearCart();
  }, [total, change, clearCart, toast]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const canComplete = items.length > 0 && amountPaid >= total && total > 0;

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <span className="text-4xl">💳</span>
            Quick Shop POS
          </h1>
          <p className="text-muted-foreground mt-1">Fast & Easy Cash Register</p>
        </header>

        <div className="grid lg:grid-cols-[1fr,420px] gap-6">
          {/* Left Panel - Products */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-5 animate-slide-in-up">
              <ProductGrid onAddItem={addItem} />
            </div>
            
            <div className="animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
              <CustomItemForm onAddCustomItem={addCustomItem} />
            </div>
          </div>

          {/* Right Panel - Cart & Payment */}
          <div className="glass-card rounded-2xl p-5 flex flex-col h-fit lg:sticky lg:top-6 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            {/* Cart Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span className="font-semibold">Current Order</span>
              </div>
              {itemCount > 0 && (
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full animate-bounce-in">
                  {itemCount} items
                </span>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 max-h-[300px] overflow-y-auto mb-4">
              <CartSection
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
            </div>

            {/* Totals */}
            <TotalDisplay
              subtotal={subtotal}
              discountPercent={discountPercent}
              discountAmount={discountAmount}
              total={total}
            />

            {/* Discount & Payment */}
            <div className="mt-4 space-y-4">
              <DiscountInput
                discount={discountPercent}
                onDiscountChange={setDiscountPercent}
              />
              
              <PaymentSection
                total={total}
                amountPaid={amountPaid}
                change={change}
                onAmountPaidChange={setAmountPaid}
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-border">
              <ActionButtons
                hasItems={items.length > 0}
                canComplete={canComplete}
                onPrint={printReceipt}
                onClear={clearCart}
                onComplete={completeSale}
              />
            </div>
          </div>
        </div>

        {/* Hidden Receipt for Printing */}
        <div className="hidden">
          <Receipt
            ref={receiptRef}
            items={items}
            subtotal={subtotal}
            discountPercent={discountPercent}
            discountAmount={discountAmount}
            total={total}
            amountPaid={amountPaid}
            change={change}
          />
        </div>
      </div>
    </div>
  );
};

export default POSLayout;
