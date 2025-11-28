import React from 'react';
import { HeroGallery } from '../components/HeroGallery';
import { ProductsGrid } from '../components/ProductsGrid';
import { ProductCarousel } from '../components/ProductCarousel';
import { FeatureCards } from '../components/FeatureCards';
import { TopCategories } from '../components/TopCategories';
import { DealOfTheDay } from '../components/DealOfTheDay';
import { ReviewsSection } from '../components/ReviewsSection';
import { OrderTrackingWidget } from '../components/OrderTrackingWidget';
import { categories } from '../constants';
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

const StyleGuide = () => (
    <section className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="relative rounded-xl overflow-hidden h-96 group">
                <img src="/images/banner/banner-2.webp" alt="Casual Wear" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 text-white p-8">
                    <h3 className="text-3xl font-bold">আরামদায়ক থ্রি-পিস</h3>
                    <p className="mt-2 text-base">প্রতিদিনের ব্যবহারের জন্য সেরা</p>
                    <button className="mt-4 bg-white/90 text-brand-dark font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-white transition-colors">সংগ্রহ দেখুন</button>
                </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-96 group">
                <img src="/images/banner/banner-3.webp" alt="Hijab Collection" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 text-white p-8">
                    <h3 className="text-3xl font-bold">গর্জিয়াস হিজাব</h3>
                    <p className="mt-2 text-base">যেকোনো অনুষ্ঠানের জন্য</p>
                    <button className="mt-4 bg-white/90 text-brand-dark font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-white transition-colors">সংগ্রহ দেখুন</button>
                </div>
            </div>
        </div>
    </section>
);


export const HomePage: React.FC<HomePageProps> = ({ products, navigateTo, navigateToShop, onProductSelect, wishlist, toggleWishlist, addToCart, buyNow, onQuickView }) => {
    const hotDeals = products.filter(p => p.originalPrice).sort((a,b) => b.reviewCount - a.reviewCount).slice(0, 4);
    const newArrivals = [...products].sort((a, b) => (a.id > b.id ? -1 : 1)).slice(0, 8); // Simplistic new arrival logic
    const dealProduct = products.find(p => p.id === 'prod_4') || products[3];

    return (
        <div className="space-y-16 md:space-y-28 pb-16 bg-brand-cream">
            <HeroGallery navigateTo={navigateTo} />
            
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <FeatureCards />
            </div>

            <ProductCarousel
                title="নতুন কালেকশন"
                products={newArrivals}
                onProductSelect={onProductSelect}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                buyNow={buyNow}
                onQuickView={onQuickView}
                viewAllLink={() => navigateToShop('all')}
            />
            
            <TopCategories 
                categories={categories.filter(c => c.id !== 'all')} 
                navigateToShop={navigateToShop}
            />
            
            <section className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
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

            <StyleGuide />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <OrderTrackingWidget />
            </div>

            <ReviewsSection />

        </div>
    );
};