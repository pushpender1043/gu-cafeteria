
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) => {
  return (
    <div className="py-4">
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="flex space-x-2 px-6 md:px-0">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className={`rounded-full ${selectedCategory === null ? 'bg-foodfusion-orange text-white' : ''}`}
            onClick={() => onSelectCategory(null)}
          >
            All Items
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === category ? 'bg-foodfusion-orange text-white' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
