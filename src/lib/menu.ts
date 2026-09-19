import galleryNaan from "@/assets/gallery-naan.jpg";
import galleryThali from "@/assets/gallery-thali.jpg";
import showcaseTandoor from "@/assets/showcase-tandoor.jpg";
import galleryDrinks from "@/assets/gallery-drinks.jpg";
import heroFeast from "@/assets/hero-feast.jpg";
import galleryDining from "@/assets/gallery-dining.jpg";

export type MenuCategory =
  | "Vegetarian"
  | "Non-Vegetarian"
  | "Tandoor & Breads"
  | "Thalis & Combos"
  | "Beverages";

export interface MenuItem {
  id: string;
  name: string;
  punjabiName?: string;
  description: string;
  price?: string;
  image?: string;
  category: MenuCategory;
  diet: "veg" | "non-veg";
  isSignature?: boolean;
}

export const menuCategories: MenuCategory[] = [
  "Vegetarian",
  "Non-Vegetarian",
  "Tandoor & Breads",
  "Thalis & Combos",
  "Beverages",
];

export const menuItems: MenuItem[] = [
  {
    id: "dal-makhani",
    name: "Dal Makhani Handi",
    punjabiName: "ਦਾਲ ਮੱਖਣੀ",
    description: "Slow-simmered black lentils cooked overnight with cream, fresh churned butter, and mild aromatic spices in an earthen vessel.",
    price: "₹240",
    image: heroFeast,
    category: "Vegetarian",
    diet: "veg",
    isSignature: true,
  },
  {
    id: "paneer-tikka-butter-masala",
    name: "Paneer Butter Masala",
    punjabiName: "ਪਨੀਰ ਬਟਰ ਮਸਾਲਾ",
    description: "Char-grilled cottage cheese cubes simmered in a velvety tomato, cashew, and fenugreek gravy finished with a dollop of cream.",
    price: "₹280",
    image: galleryDining,
    category: "Vegetarian",
    diet: "veg",
  },
  {
    id: "tandoori-chicken-platter",
    name: "Tandoori Chicken Tikka",
    punjabiName: "ਤੰਦੂਰੀ ਚਿਕਨ ਟਿੱਕਾ",
    description: "Succulent bone-in chicken marinated in spiced yogurt and mustard oil, slow-roasted in the clay tandoor and served on a sizzling platter.",
    price: "₹340",
    image: showcaseTandoor,
    category: "Non-Vegetarian",
    diet: "non-veg",
    isSignature: true,
  },
  {
    id: "butter-chicken-punjabi",
    name: "Murgh Makhani (Butter Chicken)",
    punjabiName: "ਬਟਰ ਚਿਕਨ",
    description: "Tandoori roasted chicken pieces simmered in rich makhani gravy seasoned with dried fenugreek leaves and fresh butter.",
    price: "₹360",
    image: heroFeast,
    category: "Non-Vegetarian",
    diet: "non-veg",
  },
  {
    id: "garlic-butter-naan",
    name: "Garlic Butter Naan Basket",
    punjabiName: "ਗਾਰਲਿਕ ਬਟਰ ਨਾਨ",
    description: "Leavened hand-stretched flatbread baked fresh against the clay tandoor wall, brushed generously with garlic butter and fresh coriander.",
    price: "₹60",
    image: galleryNaan,
    category: "Tandoor & Breads",
    diet: "veg",
    isSignature: true,
  },
  {
    id: "punjabi-deluxe-thali",
    name: "Shah Junction Royal Thali",
    punjabiName: "ਸ਼ਾਹੀ ਥਾਲੀ",
    description: "Complete traditional brass thali feast featuring Dal Makhani, Paneer specialty, seasonal subzi, jeera rice, 2 hot naans, salad, and raita.",
    price: "₹320",
    image: galleryThali,
    category: "Thalis & Combos",
    diet: "veg",
    isSignature: true,
  },
  {
    id: "punjabi-sweet-lassi",
    name: "Hand-Churned Sweet Lassi",
    punjabiName: "ਮਿੱਠੀ ਲੱਸੀ",
    description: "Thick, creamy yogurt lassi churned the traditional way, crowned with malai and infused with cardamom and crushed pistachios.",
    price: "₹90",
    image: galleryDrinks,
    category: "Beverages",
    diet: "veg",
    isSignature: true,
  },
  {
    id: "special-kadak-chai",
    name: "Special Masala Kadak Chai",
    punjabiName: "ਮਸਾਲਾ ਚਾਹ",
    description: "Slow-brewed Assam tea steeped with crushed green cardamom, ginger, cloves, and whole buffalo milk.",
    price: "₹40",
    image: galleryDrinks,
    category: "Beverages",
    diet: "veg",
  },
];
