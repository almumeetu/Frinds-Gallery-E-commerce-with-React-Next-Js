import React from 'react';
import { MobileProductCard } from './MobileProductCard';
import type { Product } from '../types';

interface ProductsGridProps {
    products: Product[];
    onProductSelect: (product: Product) => void;
    addToCart: (productId: string, quantity: number) => void;
    buyNow: (productId: string, quantity: number) => void;
    wishlist: string[];
    toggleWishlist: (productId: string) => void;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ products, onProductSelect, addToCart, buyNow, wishlist, toggleWishlist }) => {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {products.map(product => (
                <MobileProductCard 
                    key={product.id} 
                    product={product} 
                    onProductSelect={onProductSelect} 
                    addToCart={addToCart}
                    buyNow={buyNow}
                    isInWishlist={wishlist.includes(product.id)}
                    toggleWishlist={toggleWishlist}
                />
            ))}
        </div>
    );
};