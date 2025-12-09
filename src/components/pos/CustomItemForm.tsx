import { useState } from "react";
import { Plus } from "lucide-react";

interface CustomItemFormProps {
  onAddCustomItem: (name: string, price: number) => void;
}

const CustomItemForm = ({ onAddCustomItem }: CustomItemFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(price);
    if (name.trim() && !isNaN(priceNum) && priceNum > 0) {
      onAddCustomItem(name.trim(), priceNum);
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="section-title">Custom Item</div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-24 px-4 py-3 rounded-lg number-input focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold btn-press hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </form>
    </div>
  );
};

export default CustomItemForm;
