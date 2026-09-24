import {
  menuDrinks,
  menuTandoori,
  menuCurries,
  menuChinese,
  menuChineseNonVeg,
  menuBreakfast,
  menuOmelette,
  menuFish,
  menuSoups,
  menuChicken,
  menuPizza,
  menuTandooriChicken,
  menuRaita,
} from "@/lib/venue";

export interface MenuSectionDefinition {
  id: string;
  category: "Drinks" | "Breakfast" | "Snacks" | "Chinese" | "Tandoori" | "Main Course" | "Raita";
  title: string;
  punjabi: string;
  description: string;
  defaultImage: string;
  matchKeywords: string[];
}

export const MENU_SECTION_DEFINITIONS: MenuSectionDefinition[] = [
  // 1. DRINKS
  {
    id: "drinks-mocktails",
    category: "Drinks",
    title: "Mocktails & Signature Drinks",
    punjabi: "ਸ਼ਾਹੀ ਮੌਕਟੇਲ ਤੇ ਕੂਲਰਸ",
    description: "Virgin mojitos, fresh fruit punches, coolers, and iced shakes.",
    defaultImage: menuDrinks,
    matchKeywords: ["mocktail", "shake", "drink", "cooler", "punch"],
  },
  {
    id: "drinks-beverages",
    category: "Drinks",
    title: "Hot & Cold Beverages",
    punjabi: "ਗਰਮ ਤੇ ਠੰਡੇ ਪੀਣ ਵਾਲੇ ਪਦਾਰਥ",
    description: "Fresh brewed coffee, masala tea, green tea, and hot chocolate.",
    defaultImage: menuDrinks,
    matchKeywords: ["beverage", "tea", "coffee", "milk", "bournvita"],
  },
  {
    id: "drinks-bar",
    category: "Drinks",
    title: "Beer & Pergola Bar Liquors",
    punjabi: "ਬੀਅਰ, ਵਿਸਕੀ ਤੇ ਸ਼ਾਹੀ ਬਾਰ",
    description: "Chilled draught beer, premium spirits, vodka, and scotch.",
    defaultImage: menuDrinks,
    matchKeywords: ["beer", "whisky", "scotch", "vodka", "rum", "gin", "brandy", "breezer"],
  },

  // 2. BREAKFAST
  {
    id: "breakfast-kulcha",
    category: "Breakfast",
    title: "Amritsari Stuffed Kulcha",
    punjabi: "ਅੰਮ੍ਰਿਤਸਰੀ ਸਟੱਫਡ ਕੁਲਚਾ ਤੇ ਚੋਲੇ",
    description: "Crispy tandoori kulcha with white butter, spicy chole, and Punjabi lassi.",
    defaultImage: menuBreakfast,
    matchKeywords: ["kulcha", "stuffed kulcha"],
  },
  {
    id: "breakfast-paratha",
    category: "Breakfast",
    title: "Tandoori Parathas & Fresh Curd",
    punjabi: "ਦੇਸੀ ਘਿਓ ਪਰੌਂਠੇ ਤੇ ਦਹੀਂ",
    description: "Aloo, gobhi, paneer, and mix parathas served with farm-fresh curd.",
    defaultImage: menuBreakfast,
    matchKeywords: ["paratha", "parantha"],
  },
  {
    id: "breakfast-omelette",
    category: "Breakfast",
    title: "Fresh Omelettes & Egg Specials",
    punjabi: "ਮਸਾਲਾ ਆਮਲੇਟ, ਭੁਰਜੀ ਤੇ ਐੱਗ",
    description: "Fluffy masala omelette, egg bhurji with buttered toast, and boiled eggs.",
    defaultImage: menuOmelette,
    matchKeywords: ["omelet", "omelette", "bhurji", "toast & egg", "egg &"],
  },
  {
    id: "breakfast-sandwich",
    category: "Breakfast",
    title: "Club & Grilled Sandwiches",
    punjabi: "ਵੈੱਜ ਤੇ ਚਿਕਨ ਸੈਂਡਵਿਚ",
    description: "Double-decker toasted cheese, veg, and grilled chicken sandwiches.",
    defaultImage: menuOmelette,
    matchKeywords: ["sandwich", "veg sandwich", "chicken sandwich"],
  },

  // 3. SNACKS & SIZZLERS
  {
    id: "snacks-soups",
    category: "Snacks",
    title: "Gourmet Hot Soups",
    punjabi: "ਗਰਮਾ-ਗਰਮ ਸ਼ਾਹੀ ਸੂਪ",
    description: "Steaming Manchow, Hot & Sour, Cream of Tomato, and Shahi Shorba.",
    defaultImage: menuSoups,
    matchKeywords: ["soup", "shorba", "manchow", "hot & sour"],
  },
  {
    id: "snacks-pizza",
    category: "Snacks",
    title: "Artisan Stone-Baked Pizzas",
    punjabi: "ਤਾਜ਼ਾ ਪਨੀਰ ਟਿੱਕਾ ਤੇ ਚੀਜ਼ ਪੀਜ਼ਾ",
    description: "Cheesy loaded mozzarella pizzas with grilled paneer tikka and herbs.",
    defaultImage: menuPizza,
    matchKeywords: ["pizza"],
  },
  {
    id: "snacks-sizzler",
    category: "Snacks",
    title: "Live Sizzlers & Continental",
    punjabi: "ਲਾਈਵ ਵੈੱਜ ਤੇ ਚਿਕਨ ਸਿੱਜ਼ਲਰ",
    description: "Smoking hot continental sizzlers with fries, grilled veggies, and cheese.",
    defaultImage: menuTandoori,
    matchKeywords: ["sizzler", "continental sizzler"],
  },
  {
    id: "snacks-continental",
    category: "Snacks",
    title: "Crispy Evening Starters & Pakoras",
    punjabi: "ਕਰਿਸਪੀ ਪਨੀਰ ਪਕੌੜਾ ਤੇ ਫਰਾਈਜ਼",
    description: "Paneer stuff pakodas, cheese fingers, veg cutlets, and french fries.",
    defaultImage: menuChineseNonVeg,
    matchKeywords: ["continental veg", "pakoda", "pakora", "finger", "cutlet", "fries"],
  },
  {
    id: "snacks-burger",
    category: "Snacks",
    title: "Fresh Burgers & Quick Bites",
    punjabi: "ਤਾਜ਼ਾ ਬਰਗਰ ਤੇ ਸਨੈਕਸ",
    description: "Crispy patty burgers loaded with cheese, lettuce, and sauces.",
    defaultImage: menuPizza,
    matchKeywords: ["burger"],
  },

  // 4. CHINESE
  {
    id: "chinese-veg",
    category: "Chinese",
    title: "Chinese Veg Oriental (Manchurian & Baby Corn)",
    punjabi: "ਵੈੱਜ ਮੰਚੂਰੀਅਨ ਤੇ ਗੋਲਡਨ ਬੇਬੀ ਕੌਰਨ",
    description: "Glazed vegetable Manchurian dumplings, golden fried baby corn, and wok noodles.",
    defaultImage: menuChinese,
    matchKeywords: ["chinese veg", "oriental", "manchurian", "baby corn"],
  },
  {
    id: "chinese-nonveg",
    category: "Chinese",
    title: "Chinese Non-Veg (Chilli Chicken & Lollipops)",
    punjabi: "ਚਿੱਲੀ ਚਿਕਨ ਤੇ ਚਿਕਨ ਲੌਲੀਪੌਪ",
    description: "Wok-tossed spicy chilli chicken, crispy chicken lollipops, and non-veg noodles.",
    defaultImage: menuChineseNonVeg,
    matchKeywords: ["chinese non-veg", "chill chicken", "chilli chicken", "lollypop", "pineapple sauce"],
  },

  // 5. TANDOORI
  {
    id: "tandoori-veg",
    category: "Tandoori",
    title: "Live Clay Tandoor Veg (Paneer Tikka)",
    punjabi: "ਤੰਦੂਰੀ ਪਨੀਰ ਟਿੱਕਾ ਤੇ ਸੋਇਆ ਚਾਪ",
    description: "Charcoal roasted paneer tikka, mushroom tikka, and tandoori snacks.",
    defaultImage: menuTandoori,
    matchKeywords: ["tandoori veg", "paneer tikka", "mushroom tikka", "chaap"],
  },
  {
    id: "tandoori-nonveg",
    category: "Tandoori",
    title: "Live Clay Tandoor Non-Veg (Chicken & Kebabs)",
    punjabi: "ਕੋਲੇ 'ਤੇ ਭੁੰਨਿਆ ਤੰਦੂਰੀ ਚਿਕਨ ਤੇ ਟਿੱਕਾ",
    description: "Juicy clay-oven roasted tandoori chicken, malai tikka, and seekh kebabs.",
    defaultImage: menuTandooriChicken,
    matchKeywords: ["tandoori non-veg", "tandoori chicken", "malai tikka", "seekh kebab"],
  },
  {
    id: "tandoori-fish",
    category: "Tandoori",
    title: "Fresh Amritsari Fish & Seafood",
    punjabi: "ਅੰਮ੍ਰਿਤਸਰੀ ਫਿਸ਼ ਟਿੱਕਾ ਤੇ ਫਰਾਈ",
    description: "Crispy river fish marinated in ajwain spices and fried golden.",
    defaultImage: menuFish,
    matchKeywords: ["fish", "machhi", "seafood"],
  },

  // 6. MAIN COURSE
  {
    id: "main-curries-veg",
    category: "Main Course",
    title: "Royal Handi Vegetarian Curries",
    punjabi: "ਸ਼ਾਹੀ ਦਾਲ ਮਖਣੀ ਤੇ ਪਨੀਰ ਲਬਾਬਦਾਰ",
    description: "Slow-simmered 24-hour Dal Makhani, Paneer Lababdar, and royal gravies.",
    defaultImage: menuCurries,
    matchKeywords: ["indian curry - veg", "dal", "paneer", "kofta", "handi"],
  },
  {
    id: "main-curries-nonveg",
    category: "Main Course",
    title: "Authentic Butter Chicken & Mutton",
    punjabi: "ਸ਼ਾਹੀ ਬਟਰ ਚਿਕਨ ਤੇ ਮੀਟ ਗ੍ਰੇਵੀ",
    description: "Rich velvety tomato butter chicken and slow-braised mutton rogan josh.",
    defaultImage: menuChicken,
    matchKeywords: ["indian curry - non-veg", "butter chicken", "mutton", "curry non-veg"],
  },
  {
    id: "main-breads",
    category: "Main Course",
    title: "Clay Oven Tandoori Breads & Naans",
    punjabi: "ਤੰਦੂਰੀ ਰੋਟੀ, ਬਟਰ ਗਾਰਲਿਕ ਨਾਨ",
    description: "Freshly slapped butter garlic naans, chur-chur naans, and tandoori rotis.",
    defaultImage: menuTandoori,
    matchKeywords: ["bread", "roti", "naan", "parantha"],
  },
  {
    id: "main-rice",
    category: "Main Course",
    title: "Fragrant Dum Biryani & Basmati Rice",
    punjabi: "ਸ਼ਾਹੀ ਦਮ ਬਿਰਯਾਨੀ ਤੇ ਪੁਲਾਓ",
    description: "Aromatic saffron basmati rice, vegetable dum biryani, and chicken biryani.",
    defaultImage: menuCurries,
    matchKeywords: ["rice", "biryani", "pulao"],
  },

  // 7. RAITA & SIDES
  {
    id: "raita-curd",
    category: "Raita",
    title: "Chilled Spiced Raita & Farm Curd",
    punjabi: "ਤਾਜ਼ਾ ਦਹੀਂ ਤੇ ਸ਼ਾਹੀ ਬੂੰਦੀ ਰਾਇਤਾ",
    description: "Velvety whipped curd with crispy boondi, garden mint, and pomegranate.",
    defaultImage: menuRaita,
    matchKeywords: ["raita", "curd", "dahi"],
  },
  {
    id: "raita-salad",
    category: "Raita",
    title: "Fresh Garden Salad & Crispy Papads",
    punjabi: "ਤਾਜ਼ਾ ਗ੍ਰੀਨ ਸਲਾਦ ਤੇ ਮਸਾਲਾ ਪਾਪੜ",
    description: "Crisp sliced cucumber, onion, tomato salad, and roasted masala papad.",
    defaultImage: menuRaita,
    matchKeywords: ["salad", "papad"],
  },
];

const STORAGE_KEY = "shah_junction_custom_menu_photos_v1";

/**
 * Get all custom uploaded photos stored in localStorage
 */
export function getAllCustomMenuPhotos(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading custom menu photos:", e);
    return {};
  }
}

/**
 * Get a specific section's custom photo (or null if using default)
 */
export function getCustomSectionPhoto(sectionId: string): string | null {
  const all = getAllCustomMenuPhotos();
  return all[sectionId] || null;
}

/**
 * Save a custom photo for a section (Data URL)
 */
export function saveCustomSectionPhoto(sectionId: string, dataUrl: string): void {
  if (typeof window === "undefined") return;
  try {
    const all = getAllCustomMenuPhotos();
    all[sectionId] = dataUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("sj-menu-photos-updated", { detail: { sectionId } }));
  } catch (e) {
    console.error("Error saving custom menu photo:", e);
  }
}

/**
 * Remove a custom photo and revert section to its default
 */
export function removeCustomSectionPhoto(sectionId: string): void {
  if (typeof window === "undefined") return;
  try {
    const all = getAllCustomMenuPhotos();
    delete all[sectionId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("sj-menu-photos-updated", { detail: { sectionId } }));
  } catch (e) {
    console.error("Error removing custom menu photo:", e);
  }
}

/**
 * Subscribe to changes made to custom menu photos
 */
export function subscribeToMenuPhotoChanges(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener("sj-menu-photos-updated", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("sj-menu-photos-updated", handler);
    window.removeEventListener("storage", handler);
  };
}

/**
 * Helper to compress and resize an uploaded image file using an offscreen canvas
 */
export function processUploadedImage(
  file: File,
  maxWidth = 1200,
  maxHeight = 800,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(reader.result as string);
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
