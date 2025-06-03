
import React from 'react';
import { ShoppingCart, BadgePercent, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  
  // Determine tier and colors based on savings amount
  const getTierInfo = (amount: number) => {
    if (amount >= 15000) {
      return {
        tier: 'Diamond',
        colors: 'from-blue-400 to-cyan-500',
        bgColors: 'from-blue-500 to-cyan-600',
        progress: 100,
        nextTier: null,
        progressColor: 'bg-cyan-400'
      };
    } else if (amount >= 10000) {
      return {
        tier: 'Gold',
        colors: 'from-yellow-400 to-amber-500',
        bgColors: 'from-yellow-500 to-amber-600',
        progress: ((amount - 10000) / 5000) * 100,
        nextTier: 15000,
        progressColor: 'bg-amber-400'
      };
    } else if (amount >= 5000) {
      return {
        tier: 'Silver',
        colors: 'from-gray-300 to-slate-400',
        bgColors: 'from-gray-400 to-slate-500',
        progress: ((amount - 5000) / 5000) * 100,
        nextTier: 10000,
        progressColor: 'bg-slate-400'
      };
    } else {
      return {
        tier: 'Bronze',
        colors: 'from-orange-400 to-amber-600',
        bgColors: 'from-orange-500 to-amber-700',
        progress: (amount / 5000) * 100,
        nextTier: 5000,
        progressColor: 'bg-amber-600'
      };
    }
  };
  
  const tierInfo = getTierInfo(totalSavings);
  
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
          <div className="relative">
            {/* Pulsing background effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${tierInfo.colors} rounded-lg opacity-20 animate-pulse`}></div>
            
            {/* Main savings display */}
            <div className={`relative bg-gradient-to-r ${tierInfo.bgColors} text-white px-4 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 min-w-[200px]`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <TrendingUp className="h-6 w-6 animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium opacity-90">{tierInfo.tier} Tier</span>
                    <span className="text-xs font-medium opacity-90">
                      ${totalSavings.toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-1 mb-1">
                    <div className="w-full bg-black/20 rounded-full h-2">
                      <div 
                        className={`h-2 ${tierInfo.progressColor} rounded-full transition-all duration-500 relative overflow-hidden`}
                        style={{ width: `${Math.min(tierInfo.progress, 100)}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {tierInfo.nextTier && (
                    <span className="text-xs opacity-75">
                      ${(tierInfo.nextTier - totalSavings).toFixed(2)} to next tier
                    </span>
                  )}
                </div>
              </div>
              
              {/* Sparkle effects */}
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <div className="w-1 h-1 bg-yellow-300 rounded-full absolute top-0 right-0 animate-ping"></div>
                <div className="w-1 h-1 bg-yellow-300 rounded-full absolute top-1 right-2 animate-ping delay-75"></div>
              </div>
            </div>
            
            {/* Additional badge for percentage */}
            {likedProducts.some(p => p.discount) && (
              <Badge 
                variant="secondary" 
                className="absolute -bottom-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 animate-bounce delay-300"
              >
                <BadgePercent className="h-3 w-3 mr-1" />
                UP TO {Math.max(...likedProducts.filter(p => p.discount).map(p => p.discount!))}% OFF
              </Badge>
            )}
          </div>
        )}
        
        <Button 
          onClick={handleCheckout}
          disabled={likedCount === 0}
          variant="outline" 
          className="flex items-center gap-2 border-grocery-primary text-grocery-primary hover:bg-grocery-light relative overflow-hidden group"
        >
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700"></div>
          <ShoppingCart className="h-4 w-4 relative z-10" />
          <span className="relative z-10">{likedCount}</span>
          {likedCount > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
