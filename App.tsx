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
import { AuthPage } from './pages/AuthPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { TermsPage } from './pages/TermsPage';
import { QuickViewModal } from './components/QuickViewModal';
import type { Product, CartItem, OrderDetails, Order, Customer, OrderItem } from './types';
import { mockProducts as initialProducts, mockOrders as initialOrders, mockCustomers as initialCustomers } from './constants';


export type Page = 'home' | 'shop' | 'productDetail' | 'checkout' | 'orderSuccess' | 'wishlist' | 'admin' | 'utility' | 'hotDeals' | 'about' | 'contact' | 'account' | 'returns' | 'terms';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]); // Array of product IDs
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [initialCategory, setInitialCategory] = useState<string>('all');
  const [currentUser, setCurrentUser] = useState<Customer | null>(null);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const navigateToShop = (categoryId: string = 'all') => {
    setInitialCategory(categoryId);
    navigateTo('shop');
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('productDetail');
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };
  
  const closeQuickView = () => {
    setQuickViewProduct(null);
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

  const handlePlaceOrder = (orderData: { customerName: string; totalAmount: number; shippingAddress: string; items: OrderItem[] }) => {
    const newOrderId = `FG-2024-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
        id: `order_${Date.now()}`,
        orderId: newOrderId,
        customerName: orderData.customerName,
        date: new Date().toISOString(),
        totalAmount: orderData.totalAmount,
        status: 'প্রক্রিয়াধীন',
        items: orderData.items,
        shippingAddress: orderData.shippingAddress,
        customerId: currentUser?.id,
    };
    
    setOrders(prev => [newOrder, ...prev]);

    if (currentUser) {
        const updatedUser: Customer = { 
            ...currentUser, 
            orderIds: [...currentUser.orderIds, newOrder.id],
            totalOrders: currentUser.totalOrders + 1,
            totalSpent: currentUser.totalSpent + newOrder.totalAmount
        };
        setCustomers(prev => prev.map(c => c.id === currentUser.id ? updatedUser : c));
        setCurrentUser(updatedUser);
    }

    setOrderDetails({
        orderId: newOrderId,
        customerName: orderData.customerName,
        totalAmount: orderData.totalAmount,
    });
    clearCart();
    navigateTo('orderSuccess');
  };

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

  // Auth Handlers
  const handleLogin = (email: string, password: string): boolean => {
    const customer = customers.find(c => c.email.toLowerCase() === email.toLowerCase() && c.password === password);
    if (customer) {
      setCurrentUser(customer);
      navigateTo('account');
      return true;
    }
    return false;
  };

  const handleRegister = (newCustomerData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'orderIds'>): boolean => {
    if (customers.some(c => c.email.toLowerCase() === newCustomerData.email.toLowerCase())) {
      return false; // Email already exists
    }
    const newCustomer: Customer = {
      ...newCustomerData,
      id: `cust_${Date.now()}`,
      totalOrders: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString(),
      orderIds: [],
    };
    setCustomers(prev => [...prev, newCustomer]);
    setCurrentUser(newCustomer);
    navigateTo('account');
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo('home');
  };


  // Admin Handlers
  const handleAddProduct = (newProduct: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    setProducts(prevProducts => [
      {
        ...newProduct,
        id: `prod_${Date.now()}`,
        rating: 0,
        reviewCount: 0,
      },
      ...prevProducts,
    ]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };
  
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
        prevOrders.map(order =>
            order.id === orderId ? { ...order, status } : order
        )
    );
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage products={products} initialCategory={initialCategory} onProductSelect={handleProductSelect} addToCart={addToCart} buyNow={buyNow} wishlist={wishlist} toggleWishlist={toggleWishlist} onQuickView={handleQuickView} navigateTo={navigateTo} navigateToShop={navigateToShop} />;
      case 'productDetail':
        return selectedProduct ? <ProductDetailPage product={selectedProduct} allProducts={products} onProductSelect={handleProductSelect} addToCart={addToCart} buyNow={buyNow} wishlist={wishlist} toggleWishlist={toggleWishlist} onQuickView={handleQuickView} navigateTo={navigateTo} navigateToShop={navigateToShop} /> : <HomePage products={products} navigateTo={navigateTo} navigateToShop={navigateToShop} onProductSelect={handleProductSelect} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} onQuickView={handleQuickView} />;
      case 'checkout':
        return <CheckoutPage cart={cart} products={products} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} onPlaceOrder={handlePlaceOrder} navigateTo={navigateTo} currentUser={currentUser} />;
      case 'orderSuccess':
        return <OrderSuccessPage orderDetails={orderDetails} navigateTo={navigateTo}/>;
      case 'wishlist':
        return <WishlistPage products={products} wishlistProductIds={wishlist} onProductSelect={handleProductSelect} addToCart={addToCart} buyNow={buyNow} toggleWishlist={toggleWishlist} navigateTo={navigateTo} onQuickView={handleQuickView} />;
      case 'admin':
        return <AdminDashboardPage 
                  navigateTo={navigateTo} 
                  products={products}
                  orders={orders}
                  customers={customers}
                  onAddProduct={handleAddProduct}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                />;
      case 'utility':
        return <UtilityPage navigateTo={navigateTo} />;
      case 'hotDeals':
        return <HotDealsPage products={products} onProductSelect={handleProductSelect} addToCart={addToCart} buyNow={buyNow} wishlist={wishlist} toggleWishlist={toggleWishlist} onQuickView={handleQuickView} navigateTo={navigateTo} />;
      case 'about':
        return <AboutUsPage navigateTo={navigateTo} />;
      case 'contact':
        return <ContactPage navigateTo={navigateTo} />;
      case 'account':
        return currentUser 
          ? <AccountPage navigateTo={navigateTo} currentUser={currentUser} orders={orders} onLogout={handleLogout} />
          : <AuthPage navigateTo={navigateTo} onLogin={handleLogin} onRegister={handleRegister} />;
      case 'returns':
        return <ReturnsPage navigateTo={navigateTo} />;
      case 'terms':
        return <TermsPage navigateTo={navigateTo} />;
      case 'home':
      default:
        return <HomePage products={products} navigateTo={navigateTo} navigateToShop={navigateToShop} onProductSelect={handleProductSelect} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} buyNow={buyNow} onQuickView={handleQuickView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Header navigateTo={navigateTo} navigateToShop={navigateToShop} cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} wishlistItemCount={wishlist.length} currentUser={currentUser} onLogout={handleLogout} />
      <main className="flex-grow w-full">
        {renderPage()}
      </main>
      <Footer navigateTo={navigateTo} navigateToShop={navigateToShop} />
      <FloatingCart cart={cart} products={products} navigateTo={navigateTo} />
      <FloatingSocials />
      {quickViewProduct && (
        <QuickViewModal
            product={quickViewProduct}
            onClose={closeQuickView}
            addToCart={addToCart}
            buyNow={buyNow}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
      )}
    </div>
  );
};

export default App;