
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Order } from "@/data/orders";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface OrderCardProps {
  order: Order;
  isStaff?: boolean;
}

export const OrderCard = ({ order, isStaff = false }: OrderCardProps) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'preparing': return 'bg-blue-500 hover:bg-blue-600';
      case 'ready': return 'bg-green-500 hover:bg-green-600';
      case 'completed': return 'bg-gray-500 hover:bg-gray-600';
      case 'cancelled': return 'bg-red-500 hover:bg-red-600';
    }
  };

  return (
    <Card className="overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-muted/30 py-3 px-4 flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm">{order.id}</h3>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(order.timestamp), { addSuffix: true })}
          </p>
        </div>
        <Badge className={`${getStatusColor(order.status)} capitalize`}>
          {order.status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="flex-1">
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          {isStaff && (
            <div className="border-t mt-3 pt-3 text-sm">
              <p><span className="font-medium">Customer:</span> {order.userName}</p>
              <p><span className="font-medium">Email:</span> {order.userEmail}</p>
              {order.pickupTime && (
                <p><span className="font-medium">Pickup Time:</span> {order.pickupTime}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
