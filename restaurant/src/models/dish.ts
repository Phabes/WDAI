import { Commentary } from './commentary';

export interface Dish {
  _id: string;
  name: string;
  kitchenType: string;
  category: string;
  products: string;
  available: number;
  priceUSD: number;
  description: string;
  url: string[];
  rates: Array<any>;
  comments: Array<Commentary>;
}
