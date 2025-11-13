import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { WishlistPage } from './pages/WishlistPage';
import { Footer } from './components/Footer';
import { FloatingCart } from './components/FloatingCart';
import { FloatingSocials } from './components/FloatingSocials';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { UtilityPage } from './pages/UtilityPage';
import { HotDealsPage } from './pages/HotDealsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { AccountPage } from './pages/AccountPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { TermsPage } from './pages/TermsPage';
import type { Product, CartItem, OrderDetails } from './types';
import { mockProducts } from './constants';


export type Page = 'home' | 'shop' | 'productDetail' | 'checkout' | 'orderSuccess' | 'wishlist' | 'admin' | 'utility' | 'hotDeals' | 'about' | 'contact' | 'account' | 'returns' | 'terms';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]); // Array of product IDs
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('productDetail');
  };

  const addToCart = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      if (existingItem) {
        return prevCart.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevCart, { productId, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.productId !== productId);
      }
      return prevCart.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };
  
  const clearCart = () => {
    setCart([]);
  }

  const handlePlaceOrder = (newOrderDetails: OrderDetails) => {
    setOrderDetails(newOrderDetails);
    clearCart();
    navigateTo('orderSuccess');
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const buyNow = (productId: string, quantity: number) => {
    addToCart(productId, quantity);
    navigateTo('checkout');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage onProductSelect={handleProductSelect} addToCart={addToCart} buyNow={buyNow} wishlist={wishlist} toggleWishlist={toggleWishlist} />;
      case 'productDetail':
        return selectedProduct ? <ProductDetailPage product={selectedProduct} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} /> : <HomePage navigateTo={navigateTo} onProductSelect={handleProductSelect} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} />;
      case 'checkout':
        return <CheckoutPage cart={cart} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} onPlaceOrder={handlePlaceOrder} />;
      case 'orderSuccess':
        return <OrderSuccessPage orderDetails={orderDetails} navigateTo={navigateTo}/>;
      case 'wishlist':
        return <WishlistPage wishlistProductIds={wishlist} onProductSelect={handleProductSelect} addToCart={addToCart} buyNow={buyNow} toggleWishlist={toggleWishlist} navigateTo={navigateTo} />;
      case 'admin':
        return <AdminDashboardPage navigateTo={navigateTo} />;
      case 'utility':
        return <UtilityPage navigateTo={navigateTo} />;
      case 'hotDeals':
        return <HotDealsPage onProductSelect={handleProductSelect} addToCart={addToCart} buyNow={buyNow} wishlist={wishlist} toggleWishlist={toggleWishlist} />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactPage />;
      case 'account':
        return <AccountPage />;
      case 'returns':
        return <ReturnsPage />;
      case 'terms':
        return <TermsPage />;
      case 'home':
      default:
        return <HomePage navigateTo={navigateTo} onProductSelect={handleProductSelect} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Header navigateTo={navigateTo} cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} wishlistItemCount={wishlist.length} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigateTo={navigateTo} />
      <FloatingCart cart={cart} navigateTo={navigateTo} />
      <FloatingSocials />
    </div>
  );
};

export default App;