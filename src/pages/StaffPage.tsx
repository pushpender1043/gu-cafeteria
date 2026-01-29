
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { OrderCard } from "@/components/OrderCard";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const StaffPage = () => {
  const { orders } = useCart();
  const [status, setStatus] = useState<string>("pending");
  
  const filteredOrders = status === "all" 
    ? orders 
    : orders.filter(order => order.status === status);
    
  const pendingCount = orders.filter(order => order.status === "pending").length;
  const preparingCount = orders.filter(order => order.status === "preparing").length;
  const readyCount = orders.filter(order => order.status === "ready").length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold">Staff Portal</h1>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <div className="flex items-center space-x-1">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                Pending: {pendingCount}
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                Preparing: {preparingCount}
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                Ready: {readyCount}
              </Badge>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="pending" onValueChange={setStatus}>
          <TabsList className="mb-8">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value={status}>
            {filteredOrders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} isStaff={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No orders found with this status.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default StaffPage;
