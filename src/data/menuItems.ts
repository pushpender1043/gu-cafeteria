
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  cafeteria: "Spoon" | "Zaika" | "Nescafe" | "GUnutri";
  popular?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, cheese and special sauce",
    price: 349,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3",
    category: "Burgers",
    cafeteria: "Spoon",
    popular: true
  },
  {
    id: "2",
    name: "Veggie Pizza",
    description: "Fresh vegetables, tomato sauce and mozzarella on thin crust",
    price: 399,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3",
    category: "Pizza",
    cafeteria: "Zaika",
    popular: true
  },
  {
    id: "3",
    name: "Chicken Caesar Salad",
    description: "Crisp romaine lettuce, grilled chicken, parmesan and Caesar dressing",
    price: 299,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3",
    category: "Salads",
    cafeteria: "GUnutri"
  },
  {
    id: "4",
    name: "Spicy Ramen",
    description: "Noodles in spicy broth with boiled egg, green onions and nori",
    price: 449,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3",
    category: "Asian",
    cafeteria: "Zaika",
    popular: true
  },
  {
    id: "5",
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with vanilla ice cream",
    price: 199,
    image: "https://images.unsplash.com/photo-1564355808539-22fda35a7530?ixlib=rb-4.0.3",
    category: "Desserts",
    cafeteria: "Nescafe"
  },
  {
    id: "6",
    name: "Grilled Salmon",
    description: "Fresh salmon fillet with seasonal vegetables and lemon-butter sauce",
    price: 499,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3",
    category: "Mains",
    cafeteria: "GUnutri"
  },
  {
    id: "7",
    name: "Iced Coffee",
    description: "Cold-brewed coffee served over ice with milk and vanilla syrup",
    price: 149,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3",
    category: "Drinks",
    cafeteria: "Nescafe"
  },
  {
    id: "8",
    name: "Chicken Wrap",
    description: "Grilled chicken with fresh vegetables and sauce in a tortilla wrap",
    price: 279,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3",
    category: "Wraps",
    cafeteria: "Spoon"
  },
  {
    id: "9",
    name: "French Fries",
    description: "Crispy golden fries seasoned with salt",
    price: 149,
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-4.0.3",
    category: "Sides",
    cafeteria: "Spoon"
  },
  {
    id: "10",
    name: "Fruit Smoothie",
    description: "Blend of fresh seasonal fruits with yogurt",
    price: 179,
    image: "https://images.unsplash.com/photo-1589734435051-1934c4cd449d?ixlib=rb-4.0.3",
    category: "Drinks",
    cafeteria: "GUnutri"
  }
];

export const categories = Array.from(new Set(menuItems.map(item => item.category)));
export const cafeterias = ["Spoon", "Zaika", "Nescafe", "GUnutri"];
