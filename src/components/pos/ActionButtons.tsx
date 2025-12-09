import { Printer, RotateCcw, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  hasItems: boolean;
  canComplete: boolean;
  onPrint: () => void;
  onClear: () => void;
  onComplete: () => void;
}

const ActionButtons = ({ hasItems, canComplete, onPrint, onClear, onComplete }: ActionButtonsProps) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={onClear}
        disabled={!hasItems}
        className={cn(
          "flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 btn-press transition-all",
          hasItems 
            ? "bg-destructive/20 text-destructive hover:bg-destructive/30" 
            : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
        )}
      >
        <RotateCcw className="w-5 h-5" />
        Clear
      </button>
      
      <button
        onClick={onPrint}
        disabled={!hasItems}
        className={cn(
          "flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 btn-press transition-all",
          hasItems 
            ? "bg-secondary hover:bg-secondary/80" 
            : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
        )}
      >
        <Printer className="w-5 h-5" />
        Print
      </button>
      
      <button
        onClick={onComplete}
        disabled={!canComplete}
        className={cn(
          "flex-[2] py-3 rounded-lg font-semibold flex items-center justify-center gap-2 btn-press transition-all",
          canComplete 
            ? "bg-success text-success-foreground hover:bg-success/90" 
            : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
        )}
      >
        <CheckCircle className="w-5 h-5" />
        Complete Sale
      </button>
    </div>
  );
};

export default ActionButtons;
