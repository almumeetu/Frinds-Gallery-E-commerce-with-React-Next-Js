import React from 'react';

interface Brand {
    name: string;
    logoUrl: string;
}

interface BrandLogosProps {
    brands: Brand[];
}

export const BrandLogos: React.FC<BrandLogosProps> = ({ brands }) => {
    const duplicatedBrands = [...brands, ...brands];
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">আমাদের ব্র্যান্ডসমূহ</h2>
            </div>
            <div className="group overflow-hidden p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center animate-marquee-slow">
                    {duplicatedBrands.map((brand, index) => (
                        <div key={`${brand.name}-${index}`} className="flex-shrink-0 px-8">
                            <img 
                                src={brand.logoUrl} 
                                alt={brand.name}
                                className="h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}