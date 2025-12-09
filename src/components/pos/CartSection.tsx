import { CartItem } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartSectionProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartSection = ({ items, onUpdateQuantity, onRemoveItem }: CartSectionProps) => {
  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="text-4xl mb-2">🛒</div>
          <p>Cart is empty</p>
          <p className="text-sm">Add items to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-2 pr-1">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "glass-card rounded-lg p-3 flex items-center gap-3",
            "animate-slide-in-right"
          )}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {item.icon && <span className="text-2xl">{item.icon}</span>}
          
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{item.name}</p>
            <p className="text-sm text-muted-foreground font-mono">
              ${item.price.toFixed(2)} each
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center btn-press hover:bg-destructive/20 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <span className="w-8 text-center font-mono font-bold">
              {item.quantity}
            </span>
            
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center btn-press hover:bg-primary/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="w-20 text-right">
            <p className="font-bold font-mono text-primary">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => onRemoveItem(item.id)}
            className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center btn-press hover:bg-destructive/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartSection;
