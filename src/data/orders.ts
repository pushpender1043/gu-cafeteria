
import { MenuItem } from './menuItems';

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  timestamp: string;
  userName: string;
  userEmail: string;
  pickupTime?: string;
}

export const sampleOrders: Order[] = [
  {
    id: "ord-123",
    items: [
      {
        id: "1",
        name: "Classic Burger",
        description: "Juicy beef patty with lettuce, tomato, cheese and special sauce",
        price: 349,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3",
        category: "Burgers",
        quantity: 2,
      },
      {
        id: "9",
        name: "French Fries",
        description: "Crispy golden fries seasoned with salt",
        price: 149,
        image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-4.0.3",
        category: "Sides",
        quantity: 1,
      }
    ],
    total: 847,
    status: 'completed',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    userName: "Alex Johnson",
    userEmail: "alex@university.edu"
  },
  {
    id: "ord-456",
    items: [
      {
        id: "4",
        name: "Spicy Ramen",
        description: "Noodles in spicy broth with boiled egg, green onions and nori",
        price: 449,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3",
        category: "Asian",
        quantity: 1,
      }
    ],
    total: 449,
    status: 'pending',
    timestamp: new Date().toISOString(),
    userName: "Sam Wilson",
    userEmail: "sam@university.edu",
    pickupTime: "12:30 PM"
  },
];
