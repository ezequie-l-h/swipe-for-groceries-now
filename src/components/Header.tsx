
import React from 'react';
import { ShoppingCart, BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/data/products';

interface HeaderProps {
  likedCount: number;
  likedProducts: Product[];
}

const Header: React.FC<HeaderProps> = ({ likedCount, likedProducts }) => {
  const { toast } = useToast();
  
  // Calculate total savings from liked products with discounts
  const totalSavings = likedProducts.reduce((total, product) => {
    if (product.discount) {
      const originalPrice = product.price / (1 - product.discount / 100);
      const savings = originalPrice - product.price;
      return total + savings;
    }
    return total;
  }, 0);
  
  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: `You have ${likedCount} items in your cart`,
    });
  };
  
  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-grocery-primary rounded-full flex items-center justify-center">
          <ShoppingCart className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold">
          <span className="text-grocery-primary">Swipe</span>Grocery
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        {totalSavings > 0 && (
          <div className="flex items-center gap-2 text-green-600">
            <BadgePercent className="h-4 w-4" />
            <span className="text-sm font-medium">
              Savings: ${totalSavings.toLocaleString()}
            </span>
          </div>
        )}
        
        <Button 
          onClick={handleCheckout}
          disabled={likedCount === 0}
          variant="outline" 
          className="flex items-center gap-2 border-grocery-primary text-grocery-primary hover:bg-grocery-light"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{likedCount}</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
