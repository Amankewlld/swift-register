import { DollarSign, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentSectionProps {
  total: number;
  amountPaid: number;
  change: number;
  onAmountPaidChange: (value: number) => void;
}

const quickAmounts = [5, 10, 20, 50, 100];

const PaymentSection = ({ total, amountPaid, change, onAmountPaidChange }: PaymentSectionProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
        <Banknote className="w-5 h-5 text-success" />
        <span className="text-sm font-medium">Customer Paid</span>
        <div className="flex-1 relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="number"
            min="0"
            step="0.01"
            value={amountPaid || ""}
            onChange={(e) => onAmountPaidChange(parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className="w-full pl-8 pr-3 py-2 rounded-lg number-input focus:outline-none"
          />
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div className="flex gap-2 flex-wrap">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => onAmountPaidChange(amount)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-mono font-medium btn-press transition-all",
              amountPaid === amount
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            )}
          >
            ${amount}
          </button>
        ))}
        <button
          onClick={() => onAmountPaidChange(Math.ceil(total))}
          className="px-4 py-2 rounded-lg text-sm font-medium btn-press bg-success/20 text-success hover:bg-success/30 transition-all"
        >
          Exact
        </button>
      </div>

      {/* Change Display */}
      {amountPaid > 0 && (
        <div className={cn(
          "p-4 rounded-lg animate-scale-in",
          change >= 0 ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"
        )}>
          <div className="flex items-center justify-between">
            <span className="font-medium">Change Due</span>
            <span className={cn(
              "text-2xl font-bold font-mono",
              change >= 0 ? "text-success" : "text-destructive"
            )}>
              ${Math.abs(change).toFixed(2)}
              {change < 0 && " short"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
