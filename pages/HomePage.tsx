import React from 'react';
import { HeroGallery } from '../components/HeroGallery';
import { ProductsGrid } from '../components/ProductsGrid';
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
    const hotDeals = products.filter(p => p.originalPrice).sort((a,b) => b.reviewCount - a.reviewCount).slice(0, 4);
    const trendingProducts = products.sort((a,b) => b.rating - a.rating).slice(0, 8);
    // A specific, visually appealing product for the Deal of the Day section
    const dealProduct = products.find(p => p.id === 'prod_4') || products[3];

    return (
        <div className="space-y-16 md:space-y-20 pb-16 bg-brand-cream">
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
            
            <section className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">হট ডিল</h2>
                  <button onClick={() => navigateTo('hotDeals')} className="text-sm font-semibold text-brand-green hover:underline">
                      সব দেখুন
                  </button>
                </div>
                <ProductsGrid 
                    products={hotDeals} 
                    onProductSelect={onProductSelect}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    addToCart={addToCart}
                    buyNow={buyNow}
                    onQuickView={onQuickView}
                />
            </section>

            {dealProduct && (
                <DealOfTheDay
                    product={dealProduct}
                    buyNow={buyNow}
                    navigateToShop={navigateToShop}
                />
            )}
            
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <OrderTrackingWidget />
            </div>

            <ReviewsSection />

            <BrandLogos brands={brands} />

        </div>
    );
};