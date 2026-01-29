
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/menuItems';
import { CartItem, Order, sampleOrders } from '../data/orders';
import { useToast } from '@/components/ui/use-toast';

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  placeOrder: (userName: string, userEmail: string) => Order;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [cartTotal, setCartTotal] = useState(0);
  const { toast } = useToast();

  // Calculate cart total whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(Number(total));
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Item doesn't exist, add to cart with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (userName: string, userEmail: string): Order => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      throw new Error("Cart is empty");
    }
    
    // Create new order
    const newOrder: Order = {
      id: `ord-${Math.floor(Math.random() * 10000)}`,
      items: [...cart],
      total: cartTotal,
      status: 'pending',
      timestamp: new Date().toISOString(),
      userName,
      userEmail,
      pickupTime: `${new Date(Date.now() + 20 * 60000).getHours()}:${new Date(Date.now() + 20 * 60000).getMinutes().toString().padStart(2, '0')}`,
    };
    
    // Add order to orders list
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    
    // Clear cart
    clearCart();
    
    toast({
      title: "Order placed!",
      description: "Your order has been placed successfully.",
    });
    
    return newOrder;
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        orders,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        cartTotal, 
        placeOrder 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
