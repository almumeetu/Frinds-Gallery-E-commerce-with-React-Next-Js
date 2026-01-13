// Backend Adapter - Switch between WordPress and Supabase
import { wordpressProductService, wordpressCategoryService, wordpressOrderService } from './wordpressGraphQL';
import { productService as supabaseProductService } from './productService';
import { categories } from '../constants';
import type { Product, Category } from '../types';

// Use WordPress by default, can be toggled with env variable
const USE_WORDPRESS = import.meta.env.REACT_APP_USE_WORDPRESS !== 'false';

/**
 * Unified Product Service - Abstracts backend (WordPress or Supabase)
 * Allows seamless switching between backends
 */
export const productServiceAdapter = {
  async getAllProducts(limit?: number): Promise<Product[]> {
    try {
      if (USE_WORDPRESS) {
        return await wordpressProductService.getAllProducts(limit || 20);
      } else {
        return await supabaseProductService.getAllProducts();
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async getProductsByCategory(category: string, limit?: number): Promise<Product[]> {
    try {
      if (USE_WORDPRESS) {
        return await wordpressProductService.getProductsByCategory(category, limit || 20);
      } else {
        return await supabaseProductService.getProductsByCategory(category);
      }
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      if (USE_WORDPRESS) {
        return await wordpressProductService.getProductById(id);
      } else {
        return await supabaseProductService.getProductById(id);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  async searchProducts(query: string, limit?: number): Promise<Product[]> {
    try {
      if (USE_WORDPRESS) {
        return await wordpressProductService.searchProducts(query, limit || 20);
      } else {
        return await supabaseProductService.searchProducts(query);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    // Creation only works with Supabase for now
    if (USE_WORDPRESS) {
      throw new Error('Product creation not yet supported via WordPress GraphQL');
    }
    return await supabaseProductService.createProduct(product);
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    // Updates only work with Supabase for now
    if (USE_WORDPRESS) {
      throw new Error('Product update not yet supported via WordPress GraphQL');
    }
    return await supabaseProductService.updateProduct(id, updates);
  },

  async deleteProduct(id: string): Promise<void> {
    // Deletion only works with Supabase for now
    if (USE_WORDPRESS) {
      throw new Error('Product deletion not yet supported via WordPress GraphQL');
    }
    return await supabaseProductService.deleteProduct(id);
  },
};

/**
 * Unified Category Service - Abstracts backend
 */
export const categoryServiceAdapter = {
  async getAllCategories(): Promise<Category[]> {
    try {
      if (USE_WORDPRESS) {
        return await wordpressCategoryService.getAllCategories();
      } else {
        // Return from constants if using Supabase
        return categories;
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },
};

/**
 * Unified Order Service
 */
export const orderServiceAdapter = {
  async getCustomerOrders(customerId?: string): Promise<any[]> {
    try {
      if (USE_WORDPRESS && customerId) {
        return await wordpressOrderService.getCustomerOrders(customerId);
      } else {
        // Fall back to Supabase implementation
        return [];
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },
};

// Export current backend status
export const getBackendStatus = () => {
  return {
    isWordPress: USE_WORDPRESS,
    backend: USE_WORDPRESS ? 'WordPress GraphQL' : 'Supabase',
    endpoint: USE_WORDPRESS 
      ? import.meta.env.REACT_APP_WORDPRESS_GRAPHQL_URL 
      : 'Supabase Database',
  };
};
