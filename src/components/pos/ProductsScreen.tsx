import { useState } from "react";
import { Product, products, categories } from "@/data/products";
import { CartItem } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, Plus, Minus, Trash2, Clock } from "lucide-react";
import CustomItemForm from "./CustomItemForm";

interface ProductsScreenProps {
  items: CartItem[];
  onAddItem: (product: Product) => void;
  onAddCustomItem: (name: string, price: number) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onEndOfDay: () => void;
}

const ProductsScreen = ({
  items,
  onAddItem,
  onAddCustomItem,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onEndOfDay,
}: ProductsScreenProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [clickedId, setClickedId] = useState<string | null>(null);

  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  const handleProductClick = (product: Product) => {
    setClickedId(product.id);
    onAddItem(product);
    setTimeout(() => setClickedId(null), 300);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6 animate-fade-in">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Select Products</h1>
            <p className="text-muted-foreground">Tap items to add to cart</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onEndOfDay}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              End of Day
            </Button>
            <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <span className="font-semibold">{itemCount} items</span>
              <span className="text-muted-foreground">|</span>
              <span className="font-bold text-primary">${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr,380px] gap-6">
          {/* Left Panel - Products */}
          <div className="space-y-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`category-tab ${
                    activeCategory === category ? "active" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="glass-card rounded-2xl p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredProducts.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className={`product-btn rounded-xl p-4 flex flex-col items-center text-center transition-all duration-200 ${
                      clickedId === product.id ? "scale-95 ring-2 ring-primary" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <span className="text-3xl mb-2">{product.icon}</span>
                    <span className="text-sm font-medium text-foreground line-clamp-2">
                      {product.name}
                    </span>
                    <span className="text-lg font-bold text-primary mt-1">
                      ${product.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Item Form */}
            <CustomItemForm onAddCustomItem={onAddCustomItem} />
          </div>

          {/* Right Panel - Cart Preview */}
          <div className="glass-card rounded-2xl p-5 h-fit lg:sticky lg:top-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Current Order
            </h3>

            {items.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Cart is empty</p>
                <p className="text-sm mt-1">Tap products to add them</p>
              </div>
            ) : (
              <>
                <div className="space-y-2 max-h-[400px] overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-primary font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Subtotal</span>
                    <span className="text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={onProceedToCheckout}
                  className="w-full h-14 mt-4 text-lg font-semibold bg-primary hover:bg-primary/90"
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsScreen;