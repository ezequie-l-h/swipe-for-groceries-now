import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { X, ShoppingCart } from "lucide-react";

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
  
  const cardStyle = {
    transform: isAnimating 
      ? "" 
      : `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
    transition: dragStart ? "none" : "transform 0.3s ease",
    zIndex: isActive ? 10 : 1,
  };
  
  const handleSwipeButtonClick = (direction: "left" | "right") => {
    if (!isActive || isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    onSwipe(direction, product.id);
    
    setTimeout(() => {
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 500);
  };
  
  const cardClasses = cn(
    "relative w-full max-w-sm mx-auto overflow-hidden shadow-lg transition-all duration-300",
    {
      "animate-slide-out-right": isAnimating && swipeDirection === "right",
      "animate-slide-out-left": isAnimating && swipeDirection === "left",
    }
  );

  const originalPrice = product.price / (1 - (product.discount || 0) / 100);

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
      {/* Product Image Section */}
      <div className="relative h-64 bg-white flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full object-contain"
        />
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-yellow-400 text-black font-bold text-lg px-4 py-2 rounded-full">
            -{product.discount}%
          </Badge>
        )}
      </div>
      
      {/* Product Info Section */}
      <div className="p-5 bg-white">
        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-2xl">$</span>
            <span className="text-3xl font-bold">{product.price.toLocaleString()}</span>
          </div>
          {product.discount && (
            <span className="text-gray-400 line-through text-lg">
              ${originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* Savings */}
        {product.discount && (
          <div className="text-red-500 text-lg mb-2">
            -{product.discount}% Ahorrás ${((originalPrice - product.price)).toLocaleString()}
          </div>
        )}
        
        {/* Unit Price */}
        {product.weight && (
          <div className="text-gray-600 text-lg mb-3">/{product.weight}</div>
        )}
        
        {/* Product Name */}
        <h3 className="text-xl font-bold mb-4">{product.name}</h3>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handleSwipeButtonClick("left")}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
          >
            <X className="h-5 w-5" />
            <span>No me interesa</span>
          </button>
          <button 
            onClick={() => handleSwipeButtonClick("right")}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-green-100 text-green-500 hover:bg-green-200 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
