import React from 'react';
import { HeroGallery } from '../components/HeroGallery';
import { ProductCarousel } from '../components/ProductCarousel';
import { FeatureCards } from '../components/FeatureCards';
import { TopCategories } from '../components/TopCategories';
import { DealOfTheDay } from '../components/DealOfTheDay';
import { BrandLogos } from '../components/BrandLogos';
import { ReviewsSection } from '../components/ReviewsSection';
import { OrderTrackingWidget } from '../components/OrderTrackingWidget';
import { categories, brands } from '../constants';
import type { Page } from '../App';
import type { Product } from '../types';

interface HomePageProps {
    products: Product[];
    navigateTo: (page: Page) => void;
    navigateToShop: (categoryId: string) => void;
    onProductSelect: (product: Product) => void;
    wishlist: string[];
    toggleWishlist: (productId: string) => void;
    addToCart: (productId: string, quantity: number) => void;
    buyNow: (productId: string, quantity: number) => void;
    onQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ products, navigateTo, navigateToShop, onProductSelect, wishlist, toggleWishlist, addToCart, buyNow, onQuickView }) => {
    const hotDeals = products.filter(p => p.originalPrice).sort((a,b) => b.reviewCount - a.reviewCount).slice(0, 8);
    const trendingProducts = products.sort((a,b) => b.rating - a.rating).slice(0, 8);

    return (
        <div className="space-y-12 md:space-y-16 pb-12 bg-white">
            <HeroGallery navigateTo={navigateTo} />
            
            <div className="px-4 sm:px-6 lg:px-8">
                <FeatureCards />
            </div>
            
            <TopCategories 
                categories={categories.filter(c => c.id !== 'all')} 
                products={trendingProducts}
                onProductSelect={onProductSelect}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                buyNow={buyNow}
                onQuickView={onQuickView}
                navigateToShop={navigateToShop}
            />

            <ProductCarousel 
                title="হট ডিল" 
                products={hotDeals} 
                onProductSelect={onProductSelect}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                buyNow={buyNow}
                onQuickView={onQuickView}
                viewAllLink={() => navigateTo('hotDeals')}
            />

            <DealOfTheDay
                products={products.slice(2, 6)}
                onProductSelect={onProductSelect}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                buyNow={buyNow}
                onQuickView={onQuickView}
            />
            
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <OrderTrackingWidget />
            </div>

            <ReviewsSection />

            <BrandLogos brands={brands} />

        </div>
    );
};
