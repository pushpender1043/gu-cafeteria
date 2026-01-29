
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CafeteriaSelectorProps {
  cafeterias: string[];
  selectedCafeteria: string;
  onSelectCafeteria: (cafeteria: string) => void;
}

export const CafeteriaSelector = ({ 
  cafeterias, 
  selectedCafeteria, 
  onSelectCafeteria 
}: CafeteriaSelectorProps) => {
  const cafeteriaImages = {
    "Spoon": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3",
    "Zaika": "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3",
    "Nescafe": "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3",
    "GUnutri": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3"
  };

  return (
    <div className="mt-6 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose a Cafeteria</h2>
      
      <Tabs 
        defaultValue={selectedCafeteria}
        onValueChange={onSelectCafeteria}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 w-full">
          {cafeterias.map((cafeteria) => (
            <TabsTrigger key={cafeteria} value={cafeteria}>
              {cafeteria}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {cafeterias.map((cafeteria) => (
          <Card 
            key={cafeteria}
            className={`cursor-pointer overflow-hidden hover:shadow-lg transition-all ${
              selectedCafeteria === cafeteria 
                ? 'ring-2 ring-foodfusion-orange scale-105 shadow-lg' 
                : 'opacity-70'
            }`}
            onClick={() => onSelectCafeteria(cafeteria)}
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={cafeteriaImages[cafeteria as keyof typeof cafeteriaImages]} 
                alt={cafeteria} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-lg">{cafeteria}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
