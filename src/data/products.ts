export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  icon: string;
}

export const products: Product[] = [
  // Beverages
  { id: "1", name: "Water Bottle", price: 1.50, category: "Beverages", icon: "💧" },
  { id: "2", name: "Soda", price: 2.00, category: "Beverages", icon: "🥤" },
  { id: "3", name: "Coffee", price: 3.50, category: "Beverages", icon: "☕" },
  { id: "4", name: "Orange Juice", price: 4.00, category: "Beverages", icon: "🍊" },
  { id: "5", name: "Iced Tea", price: 2.50, category: "Beverages", icon: "🧊" },
  
  // Food
  { id: "6", name: "Sandwich", price: 6.50, category: "Food", icon: "🥪" },
  { id: "7", name: "Burger", price: 8.99, category: "Food", icon: "🍔" },
  { id: "8", name: "Pizza Slice", price: 4.50, category: "Food", icon: "🍕" },
  { id: "9", name: "Salad", price: 7.00, category: "Food", icon: "🥗" },
  { id: "10", name: "Hot Dog", price: 5.00, category: "Food", icon: "🌭" },
  
  // Snacks
  { id: "11", name: "Chips", price: 2.50, category: "Snacks", icon: "🍟" },
  { id: "12", name: "Cookie", price: 1.50, category: "Snacks", icon: "🍪" },
  { id: "13", name: "Candy Bar", price: 1.75, category: "Snacks", icon: "🍫" },
  { id: "14", name: "Popcorn", price: 3.00, category: "Snacks", icon: "🍿" },
  { id: "15", name: "Ice Cream", price: 4.50, category: "Snacks", icon: "🍦" },
];

export const categories = [...new Set(products.map(p => p.category))];
