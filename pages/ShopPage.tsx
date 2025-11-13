import React, { useState } from 'react';
import { ProductsGrid } from '../components/ProductsGrid';
import { SidebarFilters } from '../components/SidebarFilters';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { mockProducts, categories } from '../constants';
import type { Product } from '../types';

interface ShopPageProps {
    onProductSelect: (product: Product) => void;
    addToCart: (productId: string, quantity: number) => void;
    buyNow: (productId: string, quantity: number) => void;
    wishlist: string[];
    toggleWishlist: (productId: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onProductSelect, addToCart, buyNow, wishlist, toggleWishlist }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [availability, setAvailability] = useState('all'); // 'all', 'inStock', 'outOfStock'
    const [sortOrder, setSortOrder] = useState('default');

    const filteredProducts = mockProducts
      .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
      .filter(p => p.price >= priceRange.min && p.price <= priceRange.max)
      .filter(p => {
        if (availability === 'inStock') return p.stock > 0;
        if (availability === 'outOfStock') return p.stock === 0;
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'price-asc') return a.price - b.price;
        if (sortOrder === 'price-desc') return b.price - a.price;
        return 0; // default order
      });

    const currentCategoryName = categories.find(c => c.id === selectedCategory)?.name || 'সকল পণ্য';

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <Breadcrumbs items={[{ label: 'হোম', href: '#' }, { label: 'শপ' }, { label: currentCategoryName }]} />
                
                <div className="lg:grid lg:grid-cols-4 lg:gap-8 mt-4">
                    <aside className="hidden lg:block">
                        <SidebarFilters 
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            availability={availability}
                            setAvailability={setAvailability}
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </aside>

                    <main className="lg:col-span-3">
                        <div className="bg-gray-100 p-4 rounded-md mb-6">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {currentCategoryName}
                                </h1>
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="sort" className="text-sm font-medium">সর্ট করুন:</label>
                                    <select 
                                        id="sort"
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                        className="border-gray-300 rounded-md shadow-sm text-sm"
                                    >
                                        <option value="default">ডিফল্ট</option>
                                        <option value="price-asc">মূল্য: কম থেকে বেশি</option>
                                        <option value="price-desc">মূল্য: বেশি থেকে কম</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Category filter buttons for mobile/tablet */}
                        <div className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-8 lg:hidden">
                            {categories.map(category => (
                                <button 
                                    key={category.id} 
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 ${
                                        selectedCategory === category.id 
                                        ? 'bg-brand-green text-white shadow-md' 
                                        : 'bg-white text-gray-700 hover:bg-green-50 border'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        <ProductsGrid products={filteredProducts} onProductSelect={onProductSelect} addToCart={addToCart} buyNow={buyNow} wishlist={wishlist} toggleWishlist={toggleWishlist} />

                        {/* Pagination */}
                        <div className="mt-8 flex justify-center items-center space-x-2">
                           <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>&laquo;</button>
                           <button className="px-4 py-2 text-sm font-medium text-white bg-brand-green border border-brand-green rounded-md">1</button>
                           <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">2</button>
                           <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">3</button>
                           <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">&raquo;</button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};