
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown, Heart } from "lucide-react";

type SwipeDirection = "left" | "right" | null;

interface ProductCardProps {
  product: Product;
  onSwipe: (direction: "left" | "right", productId: number) => void;
  isActive: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSwipe, isActive }) => {
  const [dragStart, setDragStart] = React.useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = React.useState<SwipeDirection>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);
  
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isActive || isAnimating) return;
    
    let clientX: number, clientY: number;
    
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    setDragStart({ x: clientX, y: clientY });
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragStart || !isActive || isAnimating) return;
    
    let clientX: number, clientY: number;
    
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const dx = clientX - dragStart.x;
    const dy = clientY - dragStart.y;
    
    setDragOffset({ x: dx, y: dy });
    
    // Determine swipe direction for visual feedback
    if (Math.abs(dx) > 50) {
      setSwipeDirection(dx > 0 ? "right" : "left");
    } else {
      setSwipeDirection(null);
    }
  };
  
  const handleDragEnd = () => {
    if (!dragStart || !isActive || isAnimating) {
      setDragStart(null);
      return;
    }
    
    const threshold = 100; // Minimum distance to trigger a swipe
    
    if (Math.abs(dragOffset.x) > threshold) {
      setIsAnimating(true);
      // Trigger swipe animation
      const direction = dragOffset.x > 0 ? "right" : "left";
      onSwipe(direction, product.id);
      
      // Reset after animation completes
      setTimeout(() => {
        setDragStart(null);
        setDragOffset({ x: 0, y: 0 });
        setSwipeDirection(null);
        setIsAnimating(false);
      }, 500); // Match animation duration
    } else {
      // If not swiped far enough, reset position
      setDragStart(null);
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
    }
  };
  
  // Calculate rotation based on drag offset
  const rotation = dragOffset.x * 0.1; // Adjust the rotation intensity
  
  // Style for the card based on drag position
  const cardStyle = {
    transform: isAnimating 
      ? "" 
      : `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
    transition: dragStart ? "none" : "transform 0.3s ease",
    zIndex: isActive ? 10 : 1,
  };
  
  const handleSwipeButtonClick = (direction: "left" | "right") => {
    if (!isActive || isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    // Trigger the swipe animation and callback
    onSwipe(direction, product.id);
    
    // Reset after animation completes
    setTimeout(() => {
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 500); // Match animation duration
  };
  
  const cardClasses = cn(
    "relative w-full max-w-sm mx-auto overflow-hidden shadow-lg transition-all duration-300",
    {
      "animate-slide-out-right": isAnimating && swipeDirection === "right",
      "animate-slide-out-left": isAnimating && swipeDirection === "left",
    }
  );

  return (
    <Card 
      className={cardClasses}
      style={cardStyle}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Product Badge Overlays */}
      {swipeDirection === "right" && (
        <div className="absolute top-10 right-4 z-30 rotate-12 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-md">
          LIKE
        </div>
      )}
      {swipeDirection === "left" && (
        <div className="absolute top-10 left-4 z-30 -rotate-12 bg-red-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-md">
          PASS
        </div>
      )}
      
      {/* Product Image */}
      <div className="relative h-64 bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.organic && (
          <Badge className="absolute top-2 left-2 bg-grocery-primary">
            Organic
          </Badge>
        )}
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-grocery-accent">
            {product.discount}% OFF
          </Badge>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <div className="text-lg font-bold text-grocery-primary">
            ${product.price.toFixed(2)}
            {product.weight && <span className="text-sm text-gray-500 ml-1">/{product.weight}</span>}
          </div>
        </div>
        
        <p className="text-gray-600 mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <Badge variant="outline" className="bg-gray-100">
            {product.category}
          </Badge>
          
          {/* Swipe Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => handleSwipeButtonClick("left")}
              className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
            >
              <ThumbsDown className="h-6 w-6 text-red-500" />
            </button>
            <button 
              onClick={() => handleSwipeButtonClick("right")}
              className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
            >
              <ThumbsUp className="h-6 w-6 text-green-500" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
