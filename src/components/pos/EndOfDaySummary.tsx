import { Button } from "@/components/ui/button";
import { X, Banknote, CreditCard, Smartphone, Percent, TrendingUp, ShoppingBag } from "lucide-react";

export interface DailySales {
  cashTotal: number;
  cardTotal: number;
  mobileTotal: number;
  totalDiscounts: number;
  transactionCount: number;
  discountedTransactions: number;
}

interface EndOfDaySummaryProps {
  sales: DailySales;
  onClose: () => void;
  onReset: () => void;
}

const EndOfDaySummary = ({ sales, onClose, onReset }: EndOfDaySummaryProps) => {
  const grandTotal = sales.cashTotal + sales.cardTotal + sales.mobileTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">End of Day Summary</h2>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Grand Total */}
          <div className="bg-primary/10 rounded-xl p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-4xl font-bold text-primary">${grandTotal.toFixed(2)}</p>
          </div>

          {/* Payment Methods */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-secondary rounded-xl p-4 text-center">
              <Banknote className="w-6 h-6 mx-auto mb-2 text-success" />
              <p className="text-xs text-muted-foreground">Cash</p>
              <p className="text-lg font-bold text-foreground">${sales.cashTotal.toFixed(2)}</p>
            </div>
            <div className="bg-secondary rounded-xl p-4 text-center">
              <CreditCard className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="text-xs text-muted-foreground">Card</p>
              <p className="text-lg font-bold text-foreground">${sales.cardTotal.toFixed(2)}</p>
            </div>
            <div className="bg-secondary rounded-xl p-4 text-center">
              <Smartphone className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <p className="text-xs text-muted-foreground">Mobile</p>
              <p className="text-lg font-bold text-foreground">${sales.mobileTotal.toFixed(2)}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 bg-secondary rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Transactions</p>
                <p className="text-xl font-bold">{sales.transactionCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-secondary rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                <Percent className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Discounts Used</p>
                <p className="text-xl font-bold">{sales.discountedTransactions}</p>
              </div>
            </div>
          </div>

          {/* Total Discounts Given */}
          <div className="flex items-center justify-between bg-destructive/10 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium">Total Discounts Given</span>
            </div>
            <span className="font-bold text-destructive">-${sales.totalDiscounts.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => {
              if (confirm("Are you sure you want to reset the daily totals?")) {
                onReset();
              }
            }}
          >
            Reset Day
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EndOfDaySummary;
