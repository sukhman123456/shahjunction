export interface MenuSubSection {
  title: string;
  note?: string;
  items: string[];
}

export interface GoldenMenuCategory {
  id: string;
  title: string;
  punjabiTitle?: string;
  note?: string;
  items?: string[];
  subSections?: MenuSubSection[];
}

export const GOLDEN_MENU_CATEGORIES: GoldenMenuCategory[] = [
  {
    id: "welcome",
    title: "WELCOME",
    punjabiTitle: "ਜੀ ਆਇਆਂ ਨੂੰ",
    items: [
      "Fresh Juice or Real Juice",
      "Fruit Punch",
      "Cold Drink",
      "Mocktails",
      "Water Bottles",
    ],
  },
  {
    id: "breakfast",
    title: "BREAKFAST",
    punjabiTitle: "ਸਵੇਰ ਦਾ ਨਾਸ਼ਤਾ",
    subSections: [
      {
        title: "VEG.",
        items: [
          "Palak Pakoda",
          "Gobhi Pakoda",
          "Paneer Stuffed Pakoda",
          "Spring Rolls",
          "Paneer Finger",
          "Poori Chana & Aloo Launji With Sirka Onion",
        ],
      },
      {
        title: "NON-VEG.",
        items: [
          "Bread-omelette",
          "Pot-Kaleji",
          "Chilly-Chicken",
          "Lemon Fish",
          "Poached Egg",
        ],
      },
    ],
  },
  {
    id: "live-tawa",
    title: "LIVE TAWA IN BREAKFAST",
    punjabiTitle: "ਲਾਈਵ ਤਵਾ ਨਾਸ਼ਤਾ",
    items: [
      "Amritsari Nutri Kulcha",
      "Paneer Bhurji",
    ],
  },
  {
    id: "sweets",
    title: "SWEETS",
    punjabiTitle: "ਮਿਠਾਈਆਂ",
    note: "Any Five",
    items: [
      "Khoya Burfi",
      "Malai Burfi",
      "Chocolate Burfi",
      "Milk Cake",
      "Chum-Chum",
      "Gulab Jamun",
      "Khas Kas Roll",
      "Malai Peda",
    ],
  },
  {
    id: "bakery",
    title: "BAKERY",
    punjabiTitle: "ਬੇਕਰੀ ਕਾਊਂਟਰ",
    note: "Minimum 10 Varieties",
    items: [
      "Bakery Shop with Candy and Counter",
      "Minimum 10 Varieties",
    ],
  },
  {
    id: "soup",
    title: "SOUP STATION",
    punjabiTitle: "ਸੂਪ ਸਟੇਸ਼ਨ",
    note: "Any Three",
    items: [
      "Veg. Munchow",
      "Sweet Corn",
      "Tomato Soup",
      "Cream of Mushroom",
      "Chicken Soup (If Non-Veg. Party)",
    ],
  },
  {
    id: "coffee-shakes",
    title: "COFFEE CAFE & SHAKES",
    punjabiTitle: "ਕੌਫ਼ੀ ਕੈਫੇ ਅਤੇ ਸ਼ੇਕਸ",
    note: "Two Coffee Machines Will Be Operated. One Machine Will Be Inside The Hall With Breakfast And The Second One Will Be At Cafe.",
    subSections: [
      {
        title: "HOT BEVERAGE",
        items: [
          "Cappuccino Coffee",
          "Espresso Coffee",
          "Black Coffee",
          "Elaichi Tea",
          "Masala Tea",
          "Black Tea",
          "Hot Chocolate",
          "Mocca",
        ],
      },
      {
        title: "SHAKES",
        items: [
          "Cold Coffee",
          "Lemon Tea",
          "Ice Tea",
          "Strawberry",
          "Vanilla",
          "Blackcurrant",
          "Pineapple",
          "Mango",
        ],
      },
    ],
  },
  {
    id: "stalls",
    title: "STALLS",
    punjabiTitle: "ਲਾਈਵ ਸਟਾਲਸ",
    note: "Any Five",
    items: [
      "Gol Gappe",
      "Tikki",
      "Bhalla Papdi Chat",
      "Palak Patta Chat",
      "Dosa",
      "Dry Fruit Chat",
      "Mango Chenna",
    ],
  },
  {
    id: "children",
    title: "FOR CHILDREN",
    punjabiTitle: "ਬੱਚਿਆਂ ਲਈ ਖ਼ਾਸ",
    items: [
      "Wood Fire Pizza",
      "Sweet Corn",
      "Pop-corn",
      "Sweet Cotton Candy",
      "Maggi",
    ],
  },
  {
    id: "fruit-shop",
    title: "LIVE FRUIT SHOP",
    punjabiTitle: "ਲਾਈਵ ਫਰੂਟ ਸ਼ਾਪ",
    note: "Minimum 12 Fruits (6 Indian and 6 Imported)",
    items: [
      "Minimum 12 Fruits",
      "6 Indian and 6 Imported",
    ],
  },
  {
    id: "mocktail-bar",
    title: "MOCKTAIL BAR",
    punjabiTitle: "ਮੌਕਟੇਲ ਬਾਰ",
    items: [
      "Fresh Lime",
      "Mint Mojito",
      "Grenadine",
      "Le Blue",
      "Watermelon",
      "Green Apple",
      "Kiwi",
      "Etc.",
    ],
  },
  {
    id: "veg-snacks",
    title: "VEG. SNACKS",
    punjabiTitle: "ਸ਼ਾਕਾਹਾਰੀ ਸਨੈਕਸ",
    subSections: [
      {
        title: "INDIAN",
        note: "Any Five",
        items: [
          "Paneer Finger",
          "Cheese Roll Crispy",
          "Cocktail Samosa",
          "Cocoyam Fry",
          "Dal Kebab",
          "French Fries",
        ],
      },
      {
        title: "ROASTED",
        note: "Any Five",
        items: [
          "Paneer Malai Tikka",
          "Mushroom Tikka",
          "Veg Seekh Kebab",
          "Champ Malai Tikka",
          "Paneer Pudina Tikka",
          "Tandoori Broccoli",
          "Tandoori Pineapple",
          "Champ Achari Tikka",
        ],
      },
      {
        title: "CHINESE",
        items: [
          "Chilly Garlic Mushroom",
          "Dry Manchurian",
          "Crispy In Peanut Butter Sauce",
          "Chilly Cheese",
          "Honey Chilly Cauliflower/Potato",
        ],
      },
      {
        title: "CONTINENTAL",
        note: "Any Four",
        items: [
          "Mushroom Duplex",
          "Cigar Rolls",
          "Cheese Triangle",
          "Cheese Corn Ball",
          "Fried Baby Corn",
          "Sizzlers",
        ],
      },
    ],
  },
  {
    id: "non-veg-snacks",
    title: "NON-VEG. SNACKS",
    punjabiTitle: "ਨਾਨ-ਵੈੱਜ ਸਨੈਕਸ",
    subSections: [
      {
        title: "FRIED COUNTER",
        items: [
          "Fish Amritsari",
          "Crumbed Fish/Fish Finger",
          "Chicken KFC Style",
          "Chicken Golden Fried",
          "Fried Chicken",
          "Chilly Chicken",
        ],
      },
      {
        title: "TANDOORI COUNTER",
        note: "Any Five",
        items: [
          "Fish Ajwaini Tikka",
          "Grilled Fish",
          "Tangri Kebab",
          "Murg Malai Tikka",
          "Murg Banjara Tikka",
          "Roasted Chicken",
          "Mutton Seekh Kebab",
          "Chicken Seekh Kebab",
        ],
      },
    ],
  },
  {
    id: "salad",
    title: "SALAD",
    punjabiTitle: "ਸਲਾਦ ਬਾਰ",
    items: [
      "All Types of Green Salads",
      "Russian Salad",
      "Legumes Salad",
      "Pasta Salad",
      "Fruit Cream Salad",
      "Cheese Salad",
    ],
  },
  {
    id: "raita",
    title: "RAITA",
    punjabiTitle: "ਰਾਇਤਾ",
    note: "Any Two",
    items: [
      "Mix Raita",
      "Pineapple Raita",
      "Dahi Bhalla Raita",
      "Plain Curd",
      "Bundi Raita",
    ],
  },
  {
    id: "veg-main-course",
    title: "VEG. MAIN COURSE",
    punjabiTitle: "ਸ਼ਾਕਾਹਾਰੀ ਮੁੱਖ ਭੋਜਨ",
    subSections: [
      {
        title: "INDIAN CUISINE",
        note: "Any Seven",
        items: [
          "Veg Pulao/Matar Onion Pulao",
          "Dal Makhni",
          "Butter Paneer / Shahi Paneer",
          "Kadhai Paneer / Palak Paneer",
          "Mushroom Do Piaza",
          "Navratan Korma",
          "Chana Masala / Pindi Chana",
          "Methi Malai Matar",
          "Palak Corn",
          "Mix Veg",
        ],
      },
      {
        title: "PUNJABI",
        items: [
          "Steamed Rice",
          "Rajmah Masala",
          "Matar Paneer",
          "Crunchy Veg / Baingan Bhartha",
          "Saag & Makki Roti",
          "Aalo Methi",
        ],
      },
    ],
  },
  {
    id: "chinese-thai",
    title: "CHINESE/THAI CUISINE",
    punjabiTitle: "ਚਾਈਨੀਜ਼ / ਥਾਈ",
    items: [
      "Fried Rice",
      "Greavy Manchurian",
      "Cheese In Hot Garlic",
      "Baby Corn & Mushroom/Thai Curry",
      "Hakka Noodles",
    ],
  },
  {
    id: "live-counters",
    title: "LIVE COUNTERS",
    punjabiTitle: "ਲਾਈਵ ਕਾਊਂਟਰਸ",
    items: [
      "Red Sauce Pasta",
      "White Sauce Pasta",
      "Yellow Dal Tadka",
      "Sabjiyon Ka Sangam",
      "Tawa Chapatti",
    ],
  },
  {
    id: "non-veg-main-course",
    title: "NON VEG. MAIN COURSE",
    punjabiTitle: "ਨਾਨ-ਵੈੱਜ ਮੁੱਖ ਭੋਜਨ",
    note: "Any Five",
    items: [
      "Murg Biryani",
      "Chicken Lababdar",
      "Butter Chicken",
      "Kadhai Chicken",
      "Rarra Chicken",
      "Mutton Rogan Josh",
      "Chicken Yakhni",
      "Handi Chicken",
    ],
  },
  {
    id: "chapati",
    title: "CHAPATI",
    punjabiTitle: "ਰੋਟੀਆਂ ਤੇ ਨਾਨ",
    items: [
      "Plain Naan",
      "Butter Naan",
      "Stuffed Naan",
      "Lacha Parantha",
      "Missi Roti",
      "Plain Tawa Roti",
    ],
  },
];
