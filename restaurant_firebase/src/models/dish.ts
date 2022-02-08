export interface Dish {
  dishID?: number;
  key?: string;
  name: string;
  kitchenType: string;
  category: string;
  products: string;
  available: number;
  priceUSD: number;
  description: string;
  url: string[];
  avgStars: number;
}
