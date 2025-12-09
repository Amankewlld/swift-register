import { forwardRef } from "react";
import { CartItem } from "@/types/cart";

interface ReceiptProps {
  items: CartItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  amountPaid: number;
  change: number;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(
  ({ items, subtotal, discountPercent, discountAmount, total, amountPaid, change }, ref) => {
    const date = new Date();
    
    return (
      <div 
        ref={ref} 
        className="print-receipt bg-foreground text-background p-6 rounded-lg font-mono text-sm max-w-sm mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-1">QUICK SHOP POS</h2>
          <p className="text-xs opacity-70">123 Main Street</p>
          <p className="text-xs opacity-70">Tel: (555) 123-4567</p>
          <div className="mt-3 pt-3 border-t border-dashed border-current/30">
            <p className="text-xs">{date.toLocaleDateString()}</p>
            <p className="text-xs">{date.toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Items */}
        <div className="border-t border-b border-dashed border-current/30 py-4 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-xs">
              <div className="flex-1">
                <span>{item.name}</span>
                {item.quantity > 1 && (
                  <span className="opacity-70"> x{item.quantity}</span>
                )}
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="py-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          {discountPercent > 0 && (
            <div className="flex justify-between text-xs">
              <span>Discount ({discountPercent}%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between font-bold pt-2 border-t border-current/30">
            <span>TOTAL</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {amountPaid > 0 && (
            <>
              <div className="flex justify-between text-xs pt-2">
                <span>Cash</span>
                <span>${amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Change</span>
                <span>${change.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-dashed border-current/30">
          <p className="text-xs opacity-70">Thank you for shopping!</p>
          <p className="text-xs opacity-70">Please come again</p>
          <div className="mt-4 flex justify-center gap-1">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="text-xs opacity-30">*</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

Receipt.displayName = "Receipt";

export default Receipt;
