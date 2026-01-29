
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2, BadgeIndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, placeOrder } = useCart();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!userName || !userEmail) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    placeOrder(userName, userEmail);
    setIsCheckoutComplete(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cart.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div 
                    key={item.id}
                    className="border rounded-lg p-4 flex gap-4 items-center"
                  >
                    <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <BadgeIndianRupee className="h-3 w-3 mr-1" />
                        {item.price}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-6 text-center">{item.quantity}</span>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold flex items-center justify-end">
                        <BadgeIndianRupee className="h-3 w-3 mr-1" />
                        {(item.price * item.quantity)}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 p-0 h-auto mt-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-xs">Remove</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="border rounded-lg p-6 bg-gray-50 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="flex items-center">
                      <BadgeIndianRupee className="h-3 w-3 mr-1" />
                      {cartTotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="flex items-center">
                      <BadgeIndianRupee className="h-3 w-3 mr-1" />0
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="flex items-center">
                      <BadgeIndianRupee className="h-3 w-3 mr-1" />
                      {cartTotal}
                    </span>
                  </div>
                </div>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full bg-foodfusion-orange hover:bg-orange-600">
                      Proceed to Checkout
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Checkout</SheetTitle>
                      <SheetDescription>
                        Complete your order by filling out your information below.
                      </SheetDescription>
                    </SheetHeader>
                    
                    {!isCheckoutComplete ? (
                      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Your Name
                          </label>
                          <Input 
                            id="name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input 
                            id="email"
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Order Details</p>
                          <div className="bg-gray-50 p-3 rounded-md text-sm">
                            <div className="space-y-1">
                              {cart.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                  <span>{item.quantity}x {item.name}</span>
                                  <span className="flex items-center">
                                    <BadgeIndianRupee className="h-3 w-3 mr-1" />
                                    {(item.price * item.quantity)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="border-t mt-2 pt-2 font-semibold flex justify-between">
                              <span>Total</span>
                              <span className="flex items-center">
                                <BadgeIndianRupee className="h-3 w-3 mr-1" />
                                {cartTotal}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <SheetFooter>
                          <Button 
                            type="submit" 
                            className="w-full bg-foodfusion-orange hover:bg-orange-600"
                          >
                            Place Order
                          </Button>
                        </SheetFooter>
                      </form>
                    ) : (
                      <div className="py-10 text-center">
                        <h3 className="text-xl font-bold text-green-600 mb-2">Order Confirmed!</h3>
                        <p className="mb-6 text-gray-700">
                          Your order has been successfully placed. You'll receive a confirmation email shortly.
                        </p>
                        <Button 
                          onClick={() => {
                            navigate('/history');
                          }}
                          className="bg-foodfusion-orange hover:bg-orange-600"
                        >
                          View Order History
                        </Button>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some delicious items from our menu!</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-foodfusion-orange hover:bg-orange-600"
            >
              Browse Menu
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
