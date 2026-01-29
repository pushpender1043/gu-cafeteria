
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/data/menuItems";
import { useCart } from "@/context/CartContext";
import { Plus, BadgeIndianRupee, Store } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden h-full flex flex-col animate-fade-in hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          loading="lazy"
        />
        <span className="absolute top-2 right-2 bg-foodfusion-teal text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
          <Store className="h-3 w-3 mr-1" />
          {item.cafeteria}
        </span>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <span className="font-bold text-foodfusion-orange flex items-center">
            <BadgeIndianRupee className="h-4 w-4 mr-1" />
            {item.price}
          </span>
        </div>
        <p className="text-gray-500 text-sm flex-grow">{item.description}</p>
        <Button 
          className="mt-4 w-full bg-foodfusion-orange hover:bg-orange-600 text-white"
          onClick={() => addToCart(item)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};
