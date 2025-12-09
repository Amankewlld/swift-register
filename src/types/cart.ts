export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  icon?: string;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  amountPaid: number;
  change: number;
}
