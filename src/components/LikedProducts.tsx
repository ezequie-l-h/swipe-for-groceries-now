
import React from 'react';
import { Product } from '@/data/products';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';

interface LikedProductsProps {
  products: Product[];
  onRemove: (id: number) => void;
}

const LikedProducts: React.FC<LikedProductsProps> = ({ products, onRemove }) => {
  if (products.length === 0) {
    return (
      <div className="bg-grocery-light p-4 rounded-lg text-center">
        <p className="text-gray-500">No liked products yet. Start swiping to add items!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)] pr-3">
      <div className="space-y-3">
        {products.map(product => (
          <Card key={product.id} className="p-3 flex items-center gap-3 pr-2">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-grow">
              <h4 className="font-medium text-sm">{product.name}</h4>
              <p className="text-sm text-green-700 font-bold">${product.price.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => onRemove(product.id)}
              className="p-1.5 rounded-full hover:bg-red-50"
            >
              <X className="h-5 w-5 text-red-500" />
            </button>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default LikedProducts;
