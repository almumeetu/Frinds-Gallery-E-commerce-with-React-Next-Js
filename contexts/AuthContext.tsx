import React, { createContext, useContext, useEffect, useState } from 'react'
import { customerServiceAdapter } from '../services/backendAdapter'
import type { Customer } from '../types'

interface AuthContextType {
  user: Customer | null
  login: (email: string, password: string) => Promise<boolean>
  register: (customer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'orderIds'>) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAdmin = user?.email === 'admin@friendsgallery.com'

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Admin Override for testing/demo purposes
    if (email === 'admin@friendsgallery.com' && password === 'admin123') {
        const adminUser: Customer = {
            id: 'admin-user-id',
            name: 'Admin User',
            email: 'admin@friendsgallery.com',
            phone: '0123456789',
            password: 'admin123',
            totalOrders: 0,
            totalSpent: 0,
            joinDate: new Date().toISOString(),
            orderIds: []
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return true;
    }

    try {
      const customer = await customerServiceAdapter.getCustomerByEmail(email)
      if (customer && customer.password === password) {
        setUser(customer)
        localStorage.setItem('user', JSON.stringify(customer))
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (customerData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'orderIds'>): Promise<boolean> => {
    try {
      const existingCustomer = await customerServiceAdapter.getCustomerByEmail(customerData.email)
      if (existingCustomer) {
        return false
      }

      const newCustomer = await customerServiceAdapter.createCustomer(customerData)
      setUser(newCustomer)
      localStorage.setItem('user', JSON.stringify(newCustomer))
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAdmin
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
