import { cn } from "@/lib/utils";

interface TotalDisplayProps {
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
}

const TotalDisplay = ({ subtotal, discountPercent, discountAmount, total }: TotalDisplayProps) => {
  return (
    <div className="space-y-2 p-4 bg-secondary/30 rounded-lg">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-mono">${subtotal.toFixed(2)}</span>
      </div>
      
      {discountPercent > 0 && (
        <div className="flex justify-between text-sm text-warning animate-fade-in">
          <span>Discount ({discountPercent}%)</span>
          <span className="font-mono">-${discountAmount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="h-px bg-border my-2" />
      
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg">Total</span>
        <span className={cn(
          "text-3xl font-bold font-mono text-primary transition-all duration-300",
          total > 0 && "glow-effect"
        )}>
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default TotalDisplay;
