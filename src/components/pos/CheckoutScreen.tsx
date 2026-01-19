import { useState, useRef } from "react";
import { CartItem } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  Receipt as ReceiptIcon,
  Printer,
  CheckCircle2,
  Percent,
  Calculator,
} from "lucide-react";
import Receipt from "./Receipt";

interface CheckoutScreenProps {
  items: CartItem[];
  onBack: () => void;
  onCompleteSale: (paymentMethod: PaymentMethod, total: number, discountAmount: number) => void;
  cashierName: string;
}

type PaymentMethod = "cash" | "card" | "mobile";

export type { PaymentMethod };

const CheckoutScreen = ({
  items,
  onBack,
  onCompleteSale,
  cashierName,
}: CheckoutScreenProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;
  const change = amountPaid - total;
  const canComplete = amountPaid >= total && total > 0;

  const quickAmounts = [5, 10, 20, 50, 100];

  const handlePrintReceipt = () => {
    setShowReceipt(true);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleComplete = () => {
    onCompleteSale(paymentMethod, total, discountAmount);
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6 animate-fade-in">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <header className="mb-6 flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground">Complete the transaction</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Order Summary */}
          <div className="space-y-4">
            {/* Items List */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <ReceiptIcon className="w-5 h-5 text-primary" />
                Order Summary
              </h3>

              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-border mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Discount Input */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                Apply Discount
              </h3>
              <div className="flex gap-2">
                {[0, 5, 10, 15, 20, 25].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => setDiscountPercent(percent)}
                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                      discountPercent === percent
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <Label className="text-sm text-muted-foreground">Custom %</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent || ""}
                  onChange={(e) =>
                    setDiscountPercent(
                      Math.min(100, Math.max(0, Number(e.target.value)))
                    )
                  }
                  className="mt-1"
                  placeholder="Enter custom discount"
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Payment */}
          <div className="space-y-4">
            {/* Payment Method */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Method
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === "cash"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Banknote className="w-8 h-8 text-success" />
                  <span className="font-medium">Cash</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <CreditCard className="w-8 h-8 text-blue-500" />
                  <span className="font-medium">Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("mobile")}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === "mobile"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Smartphone className="w-8 h-8 text-purple-500" />
                  <span className="font-medium">Mobile</span>
                </button>
              </div>
            </div>

            {/* Amount Paid & Change */}
            {paymentMethod === "cash" && (
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Cash Payment
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label>Quick Select</Label>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <button
                        onClick={() => setAmountPaid(total)}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary/20 transition-colors"
                      >
                        Exact
                      </button>
                      {quickAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setAmountPaid(amount)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            amountPaid === amount
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Amount Received</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={amountPaid || ""}
                      onChange={(e) => setAmountPaid(Number(e.target.value))}
                      className="mt-1 h-14 text-2xl font-bold text-center"
                      placeholder="0.00"
                    />
                  </div>

                  <div
                    className={`p-4 rounded-xl text-center ${
                      change >= 0
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {change >= 0 ? "Change Due" : "Amount Still Due"}
                    </p>
                    <p className="text-3xl font-bold">
                      ${Math.abs(change).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* For card/mobile, show amount to charge */}
            {paymentMethod !== "cash" && (
              <div className="glass-card rounded-2xl p-5">
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-2">Amount to Charge</p>
                  <p className="text-4xl font-bold text-primary">
                    ${total.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    {paymentMethod === "card"
                      ? "Ready for card payment"
                      : "Scan QR code or use mobile wallet"}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handlePrintReceipt}
                variant="outline"
                className="w-full h-12"
                disabled={items.length === 0}
              >
                <Printer className="w-5 h-5 mr-2" />
                Print Receipt
              </Button>

              <Button
                onClick={handleComplete}
                className="w-full h-14 text-lg font-semibold bg-success hover:bg-success/90 text-success-foreground"
                disabled={paymentMethod === "cash" ? !canComplete : items.length === 0}
              >
                <CheckCircle2 className="w-6 h-6 mr-2" />
                Complete Sale
              </Button>
            </div>
          </div>
        </div>

        {/* Hidden Receipt for Printing */}
        <div className={showReceipt ? "print-receipt" : "hidden"}>
          <Receipt
            ref={receiptRef}
            items={items}
            subtotal={subtotal}
            discountPercent={discountPercent}
            discountAmount={discountAmount}
            total={total}
            amountPaid={paymentMethod === "cash" ? amountPaid : total}
            change={paymentMethod === "cash" ? change : 0}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;