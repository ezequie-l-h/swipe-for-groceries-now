import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import LikedProducts from '@/components/LikedProducts';
import { products, Product } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [availableProducts, setAvailableProducts] = useState<Product[]>([...products]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [dislikedProducts, setDislikedProducts] = useState<Product[]>([]);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right', productId: number) => {
    const product = availableProducts[currentIndex];
    
    if (direction === 'right') {
      // User liked the product
      setLikedProducts(prev => [...prev, product]);
      toast({
        title: "Product added!",
        description: `${product.name} has been added to your liked items.`,
        variant: "default",
      });
    } else {
      // User disliked the product
      setDislikedProducts(prev => [...prev, product]);
    }
    
    // Move to the next product
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleRemoveLiked = (productId: number) => {
    setLikedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const resetProducts = () => {
    setAvailableProducts([...products]);
    setCurrentIndex(0);
  };

  useEffect(() => {
    // Check if we've reached the end of available products
    if (currentIndex >= availableProducts.length && availableProducts.length > 0) {
      toast({
        title: "You've seen all products",
        description: "Refreshing the product list for you!",
        variant: "default",
      });
      
      // Reset after a short delay
      setTimeout(() => {
        resetProducts();
      }, 1500);
    }
  }, [currentIndex, availableProducts.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header likedCount={likedProducts.length} likedProducts={likedProducts} />
      
      <div className={`flex flex-1 ${isMobile ? 'flex-col' : 'flex-row'} p-4 gap-6`}>
        <div className={`${isMobile ? 'h-[60vh]' : 'flex-1'} flex items-center justify-center`}>
          <div className="relative w-full max-w-sm h-[500px] flex items-center justify-center">
            {availableProducts.length > 0 ? (
              // Display cards with the current one on top
              availableProducts.map((product, index) => {
                // Only render the current card and a few around it for performance
                if (index < currentIndex || index > currentIndex + 2) return null;
                
                // Calculate offset for stacked card effect
                const isActive = index === currentIndex;
                const zIndex = availableProducts.length - index;
                const offset = 4 * (index - currentIndex);
                
                return (
                  <div 
                    key={product.id}
                    className="absolute"
                    style={{
                      zIndex,
                      transform: isActive ? 'none' : `translateY(${offset}px) scale(${1 - 0.05 * (index - currentIndex)})`,
                      opacity: isActive ? 1 : 0.8 - 0.2 * (index - currentIndex),
                    }}
                  >
                    <ProductCard 
                      product={product}
                      onSwipe={handleSwipe}
                      isActive={isActive}
                    />
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500 mb-4">Loading products...</p>
              </div>
            )}
            
            {currentIndex >= availableProducts.length && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-lg">
                <h3 className="text-xl font-bold mb-2">No more products to show</h3>
                <p className="text-gray-500 mb-4">You've seen all our products!</p>
              </div>
            )}
          </div>
        </div>
        
        <div className={`${isMobile ? 'h-[30vh]' : 'w-80'} bg-white rounded-lg shadow-sm p-4`}>
          <h2 className="text-lg font-bold mb-3 text-grocery-dark">Your Liked Items</h2>
          <LikedProducts 
            products={likedProducts} 
            onRemove={handleRemoveLiked} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
