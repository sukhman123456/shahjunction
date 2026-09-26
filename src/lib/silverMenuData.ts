export interface SilverMenuSubSection {
  title: string;
  note?: string;
  items: Array<{
    name: string;
    details?: string;
  }>;
}

export interface SilverMenuCategory {
  id: string;
  title: string;
  punjabiTitle?: string;
  note?: string;
  visualTag: string; // Used for category food visuals
  items?: Array<{
    name: string;
    details?: string;
  }>;
  subSections?: SilverMenuSubSection[];
}

export const SILVER_MENU_CATEGORIES: SilverMenuCategory[] = [
  {
    id: "welcome",
    title: "WELCOME",
    punjabiTitle: "ਜੀ ਆਇਆਂ ਨੂੰ",
    visualTag: "Juices & Coolers",
    items: [
      { name: "Fresh Juice or Real Juice" },
      { name: "Fruit Punch" },
      { name: "Cold Drink" },
      { name: "Mocktails" },
      { name: "Water Bottles" },
    ],
  },
  {
    id: "breakfast",
    title: "BREAKFAST",
    punjabiTitle: "ਸਵੇਰ ਦਾ ਨਾਸ਼ਤਾ",
    visualTag: "Breakfast Specials",
    subSections: [
      {
        title: "VEG.",
        items: [
          { name: "Palak Pakoda" },
          { name: "Gobhi Pakoda" },
          { name: "Paneer Stuffed Pakoda" },
          { name: "Cocktail Samosa", details: "Stuffed with: Matar, Paneer, Dry Fruit" },
          { name: "Paneer Finger" },
          { name: "Spring Rolls" },
          { name: "Manchurian" },
          { name: "Veg Bullets" },
        ],
      },
      {
        title: "NON-VEG.",
        items: [
          { name: "Bread-omelette" },
          { name: "Pot-Kaleji" },
          { name: "Lemon Chicken" },
          { name: "Masala Chicken" },
        ],
      },
    ],
  },
  {
    id: "sweets",
    title: "SWEETS",
    punjabiTitle: "ਮਿਠਾਈਆਂ",
    visualTag: "Traditional Mithai",
    items: [
      { name: "Burfi" },
      { name: "Milk Cake" },
      { name: "Chum-Chum" },
      { name: "Gulab Jamun" },
      { name: "Khas Khas Roll" },
    ],
  },
  {
    id: "bakery",
    title: "BAKERY",
    punjabiTitle: "ਬੇਕਰੀ ਕਾਊਂਟਰ",
    note: "Minimum 10 Varieties",
    visualTag: "Confectionery & Bakes",
    items: [
      { name: "Bakery Shop with Candy and Counter" },
      { name: "Minimum 10 Varieties" },
    ],
  },
  {
    id: "soup",
    title: "SOUP STATION",
    punjabiTitle: "ਸੂਪ ਸਟੇਸ਼ਨ",
    note: "Any Two",
    visualTag: "Steaming Soups",
    items: [
      { name: "Veg. Munchow" },
      { name: "Sweet Corn" },
      { name: "Tomato Soup" },
      { name: "Chicken Soup" },
    ],
  },
  {
    id: "coffee-shakes",
    title: "COFFEE CAFE & SHAKES",
    punjabiTitle: "ਕੌਫ਼ੀ ਕੈਫੇ ਅਤੇ ਸ਼ੇਕਸ",
    note: "Two Coffee Machines Will Be Operated. One Machine Will Be Inside The Hall With Breakfast And The Second One Will Be At Cafe.",
    visualTag: "Hot Brews & Cold Shakes",
    subSections: [
      {
        title: "HOT BEVERAGE",
        items: [
          { name: "Cappuccino Coffee" },
          { name: "Espresso Coffee" },
          { name: "Black Coffee" },
          { name: "Ilaichi Tea" },
          { name: "Masala Tea" },
          { name: "Black Tea" },
          { name: "Hot Chocolate" },
          { name: "Mocca" },
        ],
      },
      {
        title: "SHAKES",
        items: [
          { name: "Cold Coffee" },
          { name: "Lemon Tea" },
          { name: "Ice Tea" },
          { name: "Strawberry" },
          { name: "Vanilla" },
          { name: "Blackcurrant" },
          { name: "Pineapple" },
          { name: "Mango" },
        ],
      },
    ],
  },
  {
    id: "stalls",
    title: "STALLS",
    punjabiTitle: "ਲਾਈਵ ਸਟਾਲਸ",
    visualTag: "Street Food & Chaat",
    items: [
      { name: "Gol Gappe" },
      { name: "Tikki" },
      { name: "Bhalla Papdi Chat" },
      { name: "Dosa" },
      { name: "Pav Bhaji" },
    ],
  },
  {
    id: "children",
    title: "FOR CHILDREN",
    punjabiTitle: "ਬੱਚਿਆਂ ਲਈ ਖ਼ਾਸ",
    visualTag: "Kids Favorites & Pizza",
    items: [
      { name: "Pizza" },
      { name: "Sweet Corn" },
      { name: "Pop Corn" },
      { name: "Sweet Cotton Candy" },
    ],
  },
  {
    id: "fruit-shop",
    title: "LIVE FRUIT SHOP",
    punjabiTitle: "ਲਾਈਵ ਫਰੂਟ ਸ਼ਾਪ",
    note: "Minimum 10 Fruits (5 Indian And 5 Imported)",
    visualTag: "Exotic Fresh Fruits",
    items: [
      { name: "Minimum 10 Fruits" },
      { name: "5 Indian And 5 Imported" },
    ],
  },
  {
    id: "mocktail-bar",
    title: "MOCKTAIL BAR",
    punjabiTitle: "ਮੌਕਟੇਲ ਬਾਰ",
    visualTag: "Artisanal Mocktails",
    items: [
      { name: "Fresh Lime" },
      { name: "Mint Mojito" },
      { name: "Grenadine" },
      { name: "Blue Curacao" },
      { name: "Watermelon" },
      { name: "Green Apple" },
      { name: "Kiwi" },
      { name: "Etc." },
    ],
  },
  {
    id: "veg-snacks",
    title: "VEG. SNACKS",
    punjabiTitle: "ਸ਼ਾਕਾਹਾਰੀ ਸਨੈਕਸ",
    visualTag: "Crispy Appetizers & Tikkas",
    subSections: [
      {
        title: "INDIAN",
        items: [
          { name: "Panner Finger" },
          { name: "Cheese roll Crispy" },
          { name: "Hara Bhara Kebab" },
          { name: "Papad Dahi Kebab" },
          { name: "Cocoyam Fry" },
        ],
      },
      {
        title: "ROASTED",
        items: [
          { name: "Paneer Malai Tikka" },
          { name: "Mushroom Tikka" },
          { name: "Veg Seekh Kebab" },
          { name: "Champ Malai Tikka" },
          { name: "Champ Achari Tikka" },
        ],
      },
      {
        title: "CHINESE",
        items: [
          { name: "Kung Pao Cheese" },
          { name: "Dry Manchurian" },
          { name: "Veg. Crispy" },
          { name: "Mushroom Duplex" },
          { name: "Cheese Triangle" },
        ],
      },
    ],
  },
  {
    id: "non-veg-snacks",
    title: "NON-VEG. SNACKS",
    punjabiTitle: "ਨਾਨ-ਵੈੱਜ ਸਨੈਕਸ",
    visualTag: "Fish & Chicken Tandoori",
    subSections: [
      {
        title: "FISH COUNTER",
        items: [
          { name: "Fish Amritsari" },
          { name: "Crumbed Fish/Fish Finger" },
          { name: "Fish Ajwaini Tikka" },
        ],
      },
      {
        title: "CHICKEN COUNTER",
        items: [
          { name: "Fried Chicken" },
          { name: "Chilly Chicken" },
          { name: "Tangri Kebab" },
          { name: "Murg Malai Tikka" },
          { name: "Roasted Chicken" },
          { name: "Chicken Seekh Kebab" },
        ],
      },
    ],
  },
  {
    id: "salad",
    title: "SALAD",
    punjabiTitle: "ਸਲਾਦ ਬਾਰ",
    visualTag: "Farm Fresh Salads",
    items: [
      { name: "All Types of Green Salads" },
      { name: "Russian Salad" },
      { name: "Legumes Salad" },
      { name: "Pasta Salad" },
      { name: "Fruit cream Salad" },
      { name: "Cheese Salad" },
    ],
  },
  {
    id: "raita",
    title: "RAITA",
    punjabiTitle: "ਰਾਇਤਾ",
    note: "Any Two",
    visualTag: "Curds & Raitas",
    items: [
      { name: "Mix Raita" },
      { name: "Pineapple Raita" },
      { name: "Dahi Bhalla Raita" },
      { name: "Plain Curd" },
      { name: "Bundi Raita" },
    ],
  },
  {
    id: "veg-main-course",
    title: "VEG. MAIN COURSE",
    punjabiTitle: "ਸ਼ਾਕਾਹਾਰੀ ਮੁੱਖ ਭੋਜਨ",
    visualTag: "Royal Curries & Dal Makhni",
    subSections: [
      {
        title: "INDIAN CUISINE",
        note: "Any 6",
        items: [
          { name: "Veg Pulao / Matar Onion Pulao" },
          { name: "Dal Makhni" },
          { name: "Butter Paneer / Shahi Paneer" },
          { name: "Kadhai Paneer / Palak Paneer" },
          { name: "Mushroom Do Piaza" },
          { name: "Chana Masala / Chana Amritsari" },
          { name: "Methi Malai Matar / Birbal Kofta" },
          { name: "Mix Veg" },
        ],
      },
      {
        title: "PUNJABI",
        note: "Any 3",
        items: [
          { name: "Steamed Rice" },
          { name: "Rajmah Masala" },
          { name: "Kadhi - Pakoda" },
          { name: "Crunchy Veg" },
          { name: "Baingan Bhartha" },
          { name: "Saag & Makki Roti" },
        ],
      },
    ],
  },
  {
    id: "chinese-thai",
    title: "CHINESE / THAI CUISINE",
    punjabiTitle: "ਚਾਈਨੀਜ਼ / ਥਾਈ",
    visualTag: "Wok Noodles & Manchurian",
    items: [
      { name: "Fried Rice" },
      { name: "Greavy Manchurian" },
      { name: "Cottage Cheese In Chilli Paste" },
      { name: "Hakka Noodles" },
    ],
  },
  {
    id: "non-veg-main-course",
    title: "NON VEG. MAIN COURSE",
    punjabiTitle: "ਨਾਨ-ਵੈੱਜ ਮੁੱਖ ਭੋਜਨ",
    note: "Any 4",
    visualTag: "Biryani & Rich Gravies",
    items: [
      { name: "Murg Biryani" },
      { name: "Chicken Butter Masala" },
      { name: "Kadahi Chicken" },
      { name: "Rarra Chicken" },
      { name: "Mutton Curry" },
      { name: "Mutton Rogan Josh" },
    ],
  },
  {
    id: "chapati",
    title: "CHAPATI",
    punjabiTitle: "ਰੋਟੀਆਂ ਤੇ ਨਾਨ",
    visualTag: "Clay Oven Breads",
    items: [
      { name: "Plain Naan" },
      { name: "Butter Naan" },
      { name: "Stuffed Naan" },
      { name: "Lacha Prantha" },
      { name: "Missi Roti" },
      { name: "Plain Tawa Roti" },
    ],
  },
  {
    id: "hot-desserts",
    title: "HOT DESSERTS",
    punjabiTitle: "ਗਰਮ ਮਿਠਾਈਆਂ",
    note: "Any Three",
    visualTag: "Warm Royal Sweets",
    items: [
      { name: "Jalebi-Rabri" },
      { name: "Hot Gulab Jamun" },
      { name: "Moong Dal Halwa" },
      { name: "Gajar Ka Halwa" },
      { name: "Shahi Tukda" },
    ],
  },
  {
    id: "cold-desserts",
    title: "COLD DESSERTS",
    punjabiTitle: "ਠੰਡੀਆਂ ਮਿਠਾਈਆਂ ਤੇ ਆਈਸਕ੍ਰੀਮ",
    visualTag: "Ice Cream & Kulfa Faluda",
    subSections: [
      {
        title: "ICE CREAM",
        items: [
          { name: "Strawberry" },
          { name: "Vanilla" },
          { name: "Butter Scotch" },
          { name: "Fruit & Nuts" },
          { name: "Pan Masala" },
        ],
      },
      {
        title: "SPECIALTY",
        items: [
          { name: "Kulfa Faluda From Amritsar" },
        ],
      },
    ],
  },
];
