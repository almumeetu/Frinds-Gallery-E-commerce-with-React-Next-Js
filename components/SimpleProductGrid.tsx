import React, { useEffect, useState } from 'react';
import { getProducts } from '../lib/api';

interface SimpleProduct {
  id: string;
  name: string;
  slug: string;
  price?: string;
  regularPrice?: string;
  image?: {
    sourceUrl: string;
  };
}

export const SimpleProductGrid: React.FC = () => {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading products from WordPress...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Featured Products (WordPress)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow hover:shadow-lg transition bg-white">
            
            {/* Image Handling */}
            {product.image?.sourceUrl ? (
              <img 
                src={product.image.sourceUrl} 
                alt={product.name} 
                className="w-full h-48 object-cover mb-4 rounded"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4 text-gray-500">No Image</div>
            )}

            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-green-600 font-bold mt-2">
                 {product.price || product.regularPrice || 'N/A'}
            </p>
            
            {/* Buy Now Button - Direct Link to WordPress */}
            <a 
              href={`http://localhost/friendsgallery/product/${product.slug}`} 
              className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 font-medium"
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
