import { Percent } from "lucide-react";

interface DiscountInputProps {
  discount: number;
  onDiscountChange: (value: number) => void;
}

const DiscountInput = ({ discount, onDiscountChange }: DiscountInputProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
      <Percent className="w-5 h-5 text-warning" />
      <span className="text-sm font-medium">Discount</span>
      <input
        type="number"
        min="0"
        max="100"
        value={discount || ""}
        onChange={(e) => onDiscountChange(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
        placeholder="0"
        className="w-20 px-3 py-2 rounded-lg number-input focus:outline-none text-center"
      />
      <span className="text-muted-foreground">%</span>
    </div>
  );
};

export default DiscountInput;
