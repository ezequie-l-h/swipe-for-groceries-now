
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface HeaderProps {
  likedCount: number;
}

const Header: React.FC<HeaderProps> = ({ likedCount }) => {
  const { toast } = useToast();
  
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
      
      <Button 
        onClick={handleCheckout}
        disabled={likedCount === 0}
        variant="outline" 
        className="flex items-center gap-2 border-grocery-primary text-grocery-primary hover:bg-grocery-light"
      >
        <ShoppingCart className="h-4 w-4" />
        <span>{likedCount}</span>
      </Button>
    </header>
  );
};

export default Header;
