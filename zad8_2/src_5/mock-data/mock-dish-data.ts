import { Dish } from '../models/dish';
export class MockData {
  public static Dishes: Dish[] = [
    {
      dishID: 0,
      name: 'Kurczak faszerowany ryżem i pieczarkami',
      kitchenType: 'Polska',
      category: 'Mięsne',
      products: 'Kurczak, Ryż, Pieczarki',
      available: 20,
      priceUSD: 5.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: 'https://images.aws.nestle.recipes/resized/50c8c84a669bf98e2c696ad1d142c255_kurczak_faszerowany_ryżem__19_944_531.jpg',
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
      url: 'https://s3.party.pl/newsy/pizza-na-talerzu-lezaca-na-drewnianym-blacie-466641-4_3_800.jpg',
      avgStars: 3.5,
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
      url: 'https://kuchnia-marty.pl/wp-content/uploads/2014/09/pierogi9.jpg',
      avgStars: 5,
    },
    {
      dishID: 3,
      name: 'Pierogi z mięsem',
      kitchenType: 'Polska',
      category: 'Zupa',
      products: '2 litry wody, 200g koncetratu pomidorowego',
      available: 8,
      priceUSD: 4.49,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: 'https://s3.gotujmy.pl/newsy/przepis-na-zupe-pomidorowa-bez-koncentratu-4794-4_3_800.jpg',
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
      url: 'https://www.pyszne.pl/foodwiki/uploads/sites/7/2018/03/dal-makhani.jpg',
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
      url: 'https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/zupa-cebulowa.jpg',
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
      url: 'https://www.pyszne.pl/foodwiki/uploads/sites/7/2018/03/pakora.jpg',
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
      url: 'https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/ratatuj-ratatouille.jpg',
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
      url: 'https://zwiedzamyparyz.pl/wp-content/uploads/2018/12/quiche-lorraine.jpg',
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
      url: 'https://cdn.galleries.smcloud.net/t/galleries/gf-9UFW-qZxf-bAZt_jablecznik-na-kefirze-latwy-przepis-na-pyszne-ciasto-z-jablkami-664x442-nocrop.jpg',
      avgStars: 4,
    },
    {
      dishID: 10,
      name: 'Gołąbki z mięsem i kaszą gryczaną',
      kitchenType: 'Polska',
      category: 'Mięsne',
      products:
        'kapusta, 100g kaszy gryczanej, 700g mielonego mięsa, cebula, mąka',
      available: 11,
      priceUSD: 3.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: 'https://cdn.galleries.smcloud.net/t/galleries/gf-9UFW-qZxf-bAZt_jablecznik-na-kefirze-latwy-przepis-na-pyszne-ciasto-z-jablkami-664x442-nocrop.jpg',
      avgStars: 5,
    },
    {
      dishID: 11,
      name: 'Sałatka awokado',
      kitchenType: 'Włoska',
      category: 'Wegańska',
      products:
        'awokado, rukola, mozzarella, pomidorki koktajlowe, pieprz mielony',
      available: 9,
      priceUSD: 4.99,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sollicitudin lectus, ac lobortis felis. Duis leo nulla, convallis nec malesuada ac, tristique et ex. Sed nec odio et mauris semper tristique. Aliquam suscipit eleifend arcu. Etiam quis sodales orci. Cras auctor nec ligula ac hendrerit. Donec placerat hendrerit lorem, in tincidunt massa tristique a. In lectus nisl, mattis eu vestibulum ac, tristique nec eros.',
      url: 'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/salatka_z_awokado_2.jpg',
      avgStars: 3.5,
    },
  ];
}