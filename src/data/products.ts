export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  weight?: string;
  organic?: boolean;
  discount?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Azúcar LEDESMA Clásica",
    category: "Abarrotes",
    price: 1699,
    image: "/lovable-uploads/f0daa4be-f1fe-48c7-b929-097629e0e748.png",
    description: "Azúcar blanca clásica de primera calidad",
    weight: "kg",
    discount: 30
  },
  {
    id: 2,
    name: "Sliced Bread",
    category: "Bakery",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=800",
    description: "Freshly baked white bread, sliced and ready to enjoy.",
    weight: "500g"
  },
  {
    id: 3,
    name: "Milk",
    category: "Dairy",
    price: 3.29,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=800",
    description: "Fresh whole milk. Excellent source of calcium and protein.",
    weight: "1L"
  },
  {
    id: 4,
    name: "Strawberries",
    category: "Produce",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=800",
    description: "Sweet and juicy strawberries. Great for desserts or as a healthy snack.",
    weight: "400g",
    discount: 20
  },
  {
    id: 5,
    name: "Chicken Breast",
    category: "Meat",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=800",
    description: "Boneless, skinless chicken breasts. High in protein and versatile for many recipes.",
    weight: "500g"
  },
  {
    id: 6,
    name: "Pasta",
    category: "Dry Goods",
    price: 1.49,
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=800",
    description: "Italian spaghetti pasta. Perfect base for countless delicious meals.",
    weight: "500g"
  },
  {
    id: 7,
    name: "Bananas",
    category: "Produce",
    price: 0.89,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=800",
    description: "Fresh yellow bananas. Rich in potassium and perfect for a quick energy boost.",
    weight: "1kg"
  },
  {
    id: 8,
    name: "Ground Coffee",
    category: "Beverages",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800",
    description: "Premium ground coffee. Rich and aromatic for your morning brew.",
    weight: "250g",
    organic: true
  },
  {
    id: 9,
    name: "Chocolate Bar",
    category: "Snacks",
    price: 2.79,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652456?q=80&w=800",
    description: "Smooth milk chocolate bar. A delicious treat for any chocolate lover.",
    weight: "100g",
    discount: 10
  },
  {
    id: 10,
    name: "Tomatoes",
    category: "Produce",
    price: 2.29,
    image: "https://images.unsplash.com/photo-1592924357228-91517c977797?q=80&w=800",
    description: "Fresh red tomatoes. Versatile ingredient for salads, sauces, and more.",
    weight: "500g",
    organic: true
  }
];
