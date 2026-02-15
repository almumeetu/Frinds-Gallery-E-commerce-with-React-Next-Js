import { supabase, type Database } from '../lib/supabase'
import type { Product, Category, Order, Customer } from '../types'

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price,
        imageUrl: product.image_url,
        category: product.category,
        sku: product.sku,
        stock: product.stock,
        rating: product.rating,
        reviewCount: product.review_count,
        date: product.created_at
      }))
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price,
        imageUrl: product.image_url,
        category: product.category,
        sku: product.sku,
        stock: product.stock,
        rating: product.rating,
        reviewCount: product.review_count,
        date: product.created_at
      }))
    } catch (error) {
      console.error('Error fetching products by category:', error)
      return []
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        price: data.price,
        originalPrice: data.original_price,
        imageUrl: data.image_url,
        category: data.category,
        sku: data.sku,
        stock: data.stock,
        rating: data.rating,
        reviewCount: data.review_count,
        date: data.created_at
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  },

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price,
        imageUrl: product.image_url,
        category: product.category,
        sku: product.sku,
        stock: product.stock,
        rating: product.rating,
        reviewCount: product.review_count,
        date: product.created_at
      }))
    } catch (error) {
      console.error('Error searching products:', error)
      return []
    }
  },

  async uploadProductImage(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          price: product.price,
          original_price: product.originalPrice,
          image_url: product.imageUrl,
          category: product.category,
          sku: product.sku,
          stock: product.stock,
          rating: product.rating,
          review_count: product.reviewCount
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        price: data.price,
        originalPrice: data.original_price,
        imageUrl: data.image_url,
        category: data.category,
        sku: data.sku,
        stock: data.stock,
        rating: data.rating,
        reviewCount: data.review_count,
        date: data.created_at
      }
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    try {
      const updateData: any = {}
      if (updates.name !== undefined) updateData.name = updates.name
      if (updates.price !== undefined) updateData.price = updates.price
      if (updates.originalPrice !== undefined) updateData.original_price = updates.originalPrice
      if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl
      if (updates.category !== undefined) updateData.category = updates.category
      if (updates.sku !== undefined) updateData.sku = updates.sku
      if (updates.stock !== undefined) updateData.stock = updates.stock
      if (updates.rating !== undefined) updateData.rating = updates.rating
      if (updates.reviewCount !== undefined) updateData.review_count = updates.reviewCount

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        price: data.price,
        originalPrice: data.original_price,
        imageUrl: data.image_url,
        category: data.category,
        sku: data.sku,
        stock: data.stock,
        rating: data.rating,
        reviewCount: data.review_count,
        date: data.created_at
      }
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }
}

export const customerService = {
  async createCustomer(customer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'orderIds'>): Promise<Customer> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          password: customer.password
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        totalOrders: data.total_orders,
        totalSpent: data.total_spent,
        joinDate: data.join_date,
        orderIds: data.order_ids
      }
    } catch (error) {
      console.error('Error creating customer:', error)
      throw error
    }
  },

  async getCustomerByEmail(email: string): Promise<Customer | null> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('email', email)
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        totalOrders: data.total_orders,
        totalSpent: data.total_spent,
        joinDate: data.join_date,
        orderIds: data.order_ids
      }
    } catch (error) {
      console.error('Error fetching customer:', error)
      return null
    }
  },

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    try {
      const updateData: any = {}
      if (updates.name !== undefined) updateData.name = updates.name
      if (updates.email !== undefined) updateData.email = updates.email
      if (updates.phone !== undefined) updateData.phone = updates.phone
      if (updates.password !== undefined) updateData.password = updates.password
      if (updates.totalOrders !== undefined) updateData.total_orders = updates.totalOrders
      if (updates.totalSpent !== undefined) updateData.total_spent = updates.totalSpent
      if (updates.orderIds !== undefined) updateData.order_ids = updates.orderIds

      const { data, error } = await supabase
        .from('customers')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        totalOrders: data.total_orders,
        totalSpent: data.total_spent,
        joinDate: data.join_date,
        orderIds: data.order_ids
      }
    } catch (error) {
      console.error('Error updating customer:', error)
      throw error
    }
  }
}

export const orderService = {
  async createOrder(order: Omit<Order, 'id' | 'date'>): Promise<Order> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          order_id: order.orderId,
          customer_name: order.customerName,
          customer_id: order.customerId,
          items: order.items,
          total_amount: order.totalAmount,
          shipping_address: order.shippingAddress,
          status: order.status
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        orderId: data.order_id,
        customerName: data.customer_name,
        customerId: data.customer_id,
        items: data.items,
        totalAmount: data.total_amount,
        shippingAddress: data.shipping_address,
        status: data.status,
        date: data.date
      }
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  },

  async getOrders(): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error

      return data.map(order => ({
        id: order.id,
        orderId: order.order_id,
        customerName: order.customer_name,
        customerId: order.customer_id,
        items: order.items,
        totalAmount: order.total_amount,
        shippingAddress: order.shipping_address,
        status: order.status,
        date: order.date
      }))
    } catch (error) {
      console.error('Error fetching orders:', error)
      return []
    }
  },

  async getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customerId)
        .order('date', { ascending: false })

      if (error) throw error

      return data.map(order => ({
        id: order.id,
        orderId: order.order_id,
        customerName: order.customer_name,
        customerId: order.customer_id,
        items: order.items,
        totalAmount: order.total_amount,
        shippingAddress: order.shipping_address,
        status: order.status,
        date: order.date
      }))
    } catch (error) {
      console.error('Error fetching orders by customer:', error)
      return []
    }
  },

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        id: data.id,
        orderId: data.order_id,
        customerName: data.customer_name,
        customerId: data.customer_id,
        items: data.items,
        totalAmount: data.total_amount,
        shippingAddress: data.shipping_address,
        status: data.status,
        date: data.date
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      throw error
    }
  }
}

export const reviewService = {
  async createReview(review: {
    productId: string
    author: string
    email: string
    rating: number
    comment: string
  }): Promise<void> {
    try {
      const { error } = await supabase
        .from('product_reviews')
        .insert(review)

      if (error) throw error
    } catch (error) {
      console.error('Error creating review:', error)
      throw error
    }
  },

  async getReviewsByProductId(productId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .order('date', { ascending: false })

      if (error) throw error

      return data
    } catch (error) {
      console.error('Error fetching reviews:', error)
      return []
    }
  }
}
