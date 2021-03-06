import { Dish } from '../models/dish';
export class MockData {
  public static Dishes: Dish[] = [
    {
      dishID: 0,
      // name: 'Kurczak faszerowany ryżem i pieczarkami',
      name: 'Kurczak z ryżem',
      kitchenType: 'Polska',
      category: 'Mięsne',
      products: 'Kurczak, Ryż, Pieczarki',
      available: 20,
      priceUSD: 5.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://images.aws.nestle.recipes/resized/50c8c84a669bf98e2c696ad1d142c255_kurczak_faszerowany_ryżem__19_944_531.jpg',
        'https://ocdn.eu/images/pulscms/YjI7MDA_/5097b9004a8bd787abae786c2103c3cc.jpg',
      ],
      avgStars: 4.5,
    },
    {
      dishID: 1,
      name: 'Pizza włoska',
      kitchenType: 'Włoska',
      category: 'Przekąska',
      products: '600g mąki, 350g ciepłej wody, 25g drożdży, łyżka cukru i soli',
      available: 0,
      priceUSD: 3.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://www.oetker.pl/Recipe/Recipes/oetker.pl/pl-pl/miscellaneous/image-thumb__51050__RecipeDetail/pizza-domowa.jpg',
      ],
      avgStars: 4.5,
    },
    {
      dishID: 2,
      name: 'Pierogi z mięsem',
      kitchenType: 'Polska',
      category: 'Danie Główne',
      products: 'Mięso wołowe, 1/4 cebuli, 500g mąki',
      available: 2,
      priceUSD: 2.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: ['https://kuchnia-marty.pl/wp-content/uploads/2014/09/pierogi9.jpg'],
      avgStars: 5,
    },
    {
      dishID: 3,
      name: 'Zupa pomidorowa',
      kitchenType: 'Polska',
      category: 'Zupa',
      products: '2 litry wody, 200g koncetratu pomidorowego',
      available: 8,
      priceUSD: 4.49,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://s3.przepisy.pl/przepisy3ii/img/variants/800x0/zupa-pomidorowa.jpg',
      ],
      avgStars: 4,
    },
    {
      dishID: 4,
      name: 'Dal makhani',
      kitchenType: 'Indyjska',
      category: 'Wegańska',
      products: 'Imbir, fasole, chili, cebula',
      available: 10,
      priceUSD: 5.49,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://www.pyszne.pl/foodwiki/uploads/sites/7/2018/03/dal-makhani.jpg',
      ],
      avgStars: 4,
    },
    {
      dishID: 5,
      name: 'Zupa cebulowa',
      kitchenType: 'Francuska',
      category: 'Zupa',
      products: 'Cebule, grzanki, ser Gruyere',
      available: 10,
      priceUSD: 3.69,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/zupa-cebulowa.jpg',
      ],
      avgStars: 2,
    },
    {
      dishID: 6,
      name: 'Pakora',
      kitchenType: 'Indyjska',
      category: 'Danie Główne',
      products: 'Warzywa, klar, mąka',
      available: 12,
      priceUSD: 2.49,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://www.pyszne.pl/foodwiki/uploads/sites/7/2018/03/pakora.jpg',
      ],
      avgStars: 3,
    },
    {
      dishID: 7,
      name: 'Ratatuj',
      kitchenType: 'Francuska',
      category: 'Przystawka',
      products: 'Papryka, cukinia, bakłażan, pomidory, cebula',
      available: 12,
      priceUSD: 5.29,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/ratatuj-ratatouille.jpg',
      ],
      avgStars: 4.5,
    },
    {
      dishID: 8,
      name: 'Quiche lorraine',
      kitchenType: 'Francuska',
      category: 'Przystawka',
      products: 'Boczek, cebula, śmietana',
      available: 12,
      priceUSD: 4.49,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/quiche-lorraine.jpg',
      ],
      avgStars: 4.5,
    },
    {
      dishID: 9,
      name: 'Ciasto z jabłkami',
      kitchenType: 'Polska',
      category: 'Przystawka',
      products: 'Jabłka, masło, 200g mąki, woda',
      available: 0,
      priceUSD: 2.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://cdn.galleries.smcloud.net/t/galleries/gf-9UFW-qZxf-bAZt_jablecznik-na-kefirze-latwy-przepis-na-pyszne-ciasto-z-jablkami-664x442-nocrop.jpg',
      ],
      avgStars: 3.5,
    },
    {
      dishID: 10,
      // name: 'Gołąbki z mięsem i kaszą gryczaną',
      name: 'Gołąbki z mięsem',
      kitchenType: 'Polska',
      category: 'Mięsne',
      products:
        'Kapusta, 100g kaszy gryczanej, 700g mielonego mięsa, cebula, mąka',
      available: 11,
      priceUSD: 3.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://www.przyslijprzepis.pl/media/cache/default_view/uploads/media/recipe/0006/63/a5e4bf0843b7fd8bb2738e3b2477771a33f62c4b.jpeg',
      ],
      avgStars: 5,
    },
    {
      dishID: 11,
      name: 'Sałatka awokado',
      kitchenType: 'Włoska',
      category: 'Wegańska',
      products:
        'Awokado, rukola, mozzarella, pomidorki koktajlowe, pieprz mielony',
      available: 9,
      priceUSD: 4.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: [
        'https://d3iamf8ydd24h9.cloudfront.net/pictures/articles/2017/04/10017-v-900x556.jpg',
      ],
      avgStars: 3.5,
    },
  ];
}
