import { Product, products, categories } from "@/data/products";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  onAddItem: (product: Product) => void;
}

const ProductGrid = ({ onAddItem }: ProductGridProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [clickedId, setClickedId] = useState<string | null>(null);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleClick = (product: Product) => {
    setClickedId(product.id);
    onAddItem(product);
    setTimeout(() => setClickedId(null), 300);
  };

  return (
    <div className="space-y-4">
      <div className="section-title">Products</div>
      
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveCategory("All")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap btn-press",
            activeCategory === "All"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          All Items
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap btn-press",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {filteredProducts.map((product, index) => (
          <button
            key={product.id}
            onClick={() => handleClick(product)}
            className={cn(
              "product-btn rounded-xl p-4 flex flex-col items-center gap-2 min-h-[120px]",
              "animate-scale-in",
              clickedId === product.id && "cart-item-pulse"
            )}
            style={{ animationDelay: `${index * 0.03}s` }}
          >
            <span className="text-3xl">{product.icon}</span>
            <span className="font-medium text-sm text-center leading-tight">
              {product.name}
            </span>
            <span className="text-primary font-bold font-mono">
              ${product.price.toFixed(2)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
