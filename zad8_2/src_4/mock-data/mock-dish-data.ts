import { Dish } from '../models/dish';
export class MockData {
  public static Dishes: Dish[] = [
    {
      id: 0,
      name: 'Kurczak faszerowany ryżem i pieczarkami',
      kitchenType: 'Polska',
      category: 'Danie Główne',
      products: [],
      available: 20,
      priceUSD: 5.99,
      description:
        'Kurczak pieczony w całości z farszem z ryżu pieczarek i natki pietruszki to wspaniały pomysł na niedzielny obiad. Chrupiąca skórka kurczaka z dodatkiem ryżu i pieczarek to niesamowicie smaczne połączenie, które daje całość obiadu!',
      url: 'https://images.aws.nestle.recipes/resized/50c8c84a669bf98e2c696ad1d142c255_kurczak_faszerowany_ryżem__19_944_531.jpg',
    },
    {
      id: 1,
      name: 'Kurczak faszerowany ryżem i pieczarkami2',
      kitchenType: 'Polska2',
      category: 'Danie Główne2',
      products: [],
      available: 0,
      priceUSD: 3.99,
      description:
        'Kurczak pieczony w całości z farszem z ryżu pieczarek i natki pietruszki to wspaniały pomysł na niedzielny obiad. Chrupiąca skórka kurczaka z dodatkiem ryżu i pieczarek to niesamowicie smaczne połączenie, które daje całość obiadu!',
      url: 'https://images.aws.nestle.recipes/resized/50c8c84a669bf98e2c696ad1d142c255_kurczak_faszerowany_ryżem__19_944_531.jpg',
    },
    {
      id: 2,
      name: 'Kurczak faszerowany ryżem i pieczarkami3',
      kitchenType: 'Polska',
      category: 'Danie Główne3',
      products: [],
      available: 2,
      priceUSD: 2.99,
      description:
        'Kurczak pieczony w całości z farszem z ryżu pieczarek i natki pietruszki to wspaniały pomysł na niedzielny obiad. Chrupiąca skórka kurczaka z dodatkiem ryżu i pieczarek to niesamowicie smaczne połączenie, które daje całość obiadu!',
      url: 'https://gastrowiedza.pl/sites/default/files/styles/big/public/2020-03/Jedzenie%20z%20dostaw%C4%85%20do%20domu.jpg?itok=D6Q1BgPr',
    },
  ];
}
