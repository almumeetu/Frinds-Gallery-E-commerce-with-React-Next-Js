import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gkvzcmhtsbhvydtdapxu.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdnpjbWh0c2JodnlkdGRhcHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2ODA1MTksImV4cCI6MjA1MzI1NjUxOX0.4E2K8M2oT9ZFyXtJ2qG2Y3S9q8X7b5W6R1f2Z3d4E5'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          price: number
          original_price: number | null
          image_url: string
          category: string
          sku: string
          stock: number
          rating: number
          review_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          original_price?: number | null
          image_url: string
          category: string
          sku: string
          stock?: number
          rating?: number
          review_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          original_price?: number | null
          image_url?: string
          category?: string
          sku?: string
          stock?: number
          rating?: number
          review_count?: number
          created_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          password: string
          total_orders: number
          total_spent: number
          join_date: string
          order_ids: string[]
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          password: string
          total_orders?: number
          total_spent?: number
          join_date?: string
          order_ids?: string[]
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          password?: string
          total_orders?: number
          total_spent?: number
          join_date?: string
          order_ids?: string[]
        }
      }
      orders: {
        Row: {
          id: string
          order_id: string
          customer_name: string
          customer_id: string | null
          items: any[]
          total_amount: number
          shipping_address: string
          status: string
          date: string
        }
        Insert: {
          id?: string
          order_id: string
          customer_name: string
          customer_id?: string | null
          items: any[]
          total_amount: number
          shipping_address: string
          status?: string
          date?: string
        }
        Update: {
          id?: string
          order_id?: string
          customer_name?: string
          customer_id?: string | null
          items?: any[]
          total_amount?: number
          shipping_address?: string
          status?: string
          date?: string
        }
      }
      product_reviews: {
        Row: {
          id: string
          product_id: string
          author: string
          email: string
          rating: number
          comment: string
          date: string
        }
        Insert: {
          id?: string
          product_id: string
          author: string
          email: string
          rating: number
          comment: string
          date?: string
        }
        Update: {
          id?: string
          product_id?: string
          author?: string
          email?: string
          rating?: number
          comment?: string
          date?: string
        }
      }
    }
  }
}
