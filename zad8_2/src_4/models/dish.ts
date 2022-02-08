export interface Dish {
  id: number;
  name: string;
  kitchenType: string;
  category: string;
  products: any[];
  available: number;
  priceUSD: number;
  description: string;
  url: string;
}
