
import { useState, useEffect } from "react";
import { menuItems, categories, cafeterias } from "@/data/menuItems";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MenuCard } from "@/components/MenuCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { CafeteriaSelector } from "@/components/CafeteriaSelector";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const MenuPage = () => {
  const [selectedCafeteria, setSelectedCafeteria] = useState<string>("Spoon");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(menuItems);
  
  // Get categories specific to the selected cafeteria
  const cafeteriaCategories = Array.from(
    new Set(
      menuItems
        .filter(item => item.cafeteria === selectedCafeteria)
        .map(item => item.category)
    )
  );

  // Apply filters based on cafeteria, category, and search query
  useEffect(() => {
    let filtered = menuItems.filter(item => item.cafeteria === selectedCafeteria);
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(filtered);
    
    // Reset category when changing cafeteria
    if (selectedCategory && !cafeteriaCategories.includes(selectedCategory)) {
      setSelectedCategory(null);
    }
    
  }, [selectedCafeteria, selectedCategory, searchQuery, cafeteriaCategories]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-foodfusion-orange to-foodfusion-teal text-white text-center py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">GU Cafeteria</h1>
            <p className="text-lg max-w-xl mx-auto">
              Order delicious meals from our campus canteens. 
              Quick, convenient, and always fresh!
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Cafeteria Selector */}
          <CafeteriaSelector
            cafeterias={cafeterias}
            selectedCafeteria={selectedCafeteria}
            onSelectCafeteria={setSelectedCafeteria}
          />
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for food items..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <CategoryFilter 
            categories={cafeteriaCategories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          {/* Popular Items Section (only visible when no filters are applied) */}
          {!selectedCategory && !searchQuery && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">{selectedCafeteria}'s Popular Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menuItems
                  .filter(item => item.cafeteria === selectedCafeteria && item.popular)
                  .map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))
                }
              </div>
            </div>
          )}
          
          {/* Menu Items Grid */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory ? `${selectedCafeteria}'s ${selectedCategory}` : `${selectedCafeteria}'s Menu`}
              {searchQuery && ` matching "${searchQuery}"`}
            </h2>
            
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">
                No items found. Try a different search term or category.
              </p>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MenuPage;
