import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { productServiceAdapter, orderServiceAdapter } from '../services/backendAdapter'
import type { Product, Order, OrderStatus } from '../types'
import './AdminDashboard.css'

const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add-product'>('products')
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form states for adding product
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    imageUrl: '',
    category: 'long-khimar',
    sku: '',
    stock: ''
  })

  useEffect(() => {
    if (!isAdmin) {
      setMessage('Access denied. Admin privileges required.')
      return
    }

    loadData()
  }, [isAdmin])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, ordersData] = await Promise.all([
        productServiceAdapter.getAllProducts(),
        orderServiceAdapter.getOrders()
      ])
      setProducts(productsData)
      setOrders(ordersData)
    } catch (error) {
      console.error('Error loading data:', error)
      setMessage('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
      imageUrl: product.imageUrl,
      category: product.category,
      sku: product.sku,
      stock: product.stock.toString()
    })
    setEditingId(product.id)
    setActiveTab('add-product')
    setMessage('Editing product: ' + product.name)
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let finalImageUrl = newProduct.imageUrl

      if (selectedFile) {
        try {
          finalImageUrl = await productServiceAdapter.uploadProductImage(selectedFile)
        } catch (error) {
          console.error('Error uploading image:', error)
          setMessage('Error uploading image. Please try again.')
          return
        }
      }

      if (editingId) {
        const updatedProduct = await productServiceAdapter.updateProduct(editingId, {
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : undefined,
          imageUrl: finalImageUrl,
          category: newProduct.category,
          sku: newProduct.sku,
          stock: parseInt(newProduct.stock),
          rating: 0,
          reviewCount: 0
        })

        setProducts(products.map(p => p.id === editingId ? updatedProduct : p))
        setMessage('Product updated successfully!')
        setEditingId(null)
      } else {
        const product = await productServiceAdapter.createProduct({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : null,
          imageUrl: finalImageUrl,
          category: newProduct.category,
          sku: newProduct.sku,
          stock: parseInt(newProduct.stock),
          rating: 0,
          reviewCount: 0,
          date: new Date().toISOString()
        })
        setProducts([product, ...products])
        setMessage('Product added successfully!')
      }

      setNewProduct({
        name: '',
        price: '',
        originalPrice: '',
        imageUrl: '',
        category: 'long-khimar',
        sku: '',
        stock: ''
      })
      setSelectedFile(null)
    } catch (error) {
      console.error('Error saving product:', error)
      setMessage('Error saving product')
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await productServiceAdapter.deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
      setMessage('Product deleted successfully!')
    } catch (error) {
      console.error('Error deleting product:', error)
      setMessage('Error deleting product')
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await orderServiceAdapter.updateOrderStatus(orderId, status)
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ))
      setMessage('Order status updated successfully!')
    } catch (error) {
      console.error('Error updating order status:', error)
      setMessage('Error updating order status')
    }
  }

  if (!isAdmin) {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>Admin privileges required to access this page.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.name}</p>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products ({products.length})
        </button>
        <button
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders ({orders.length})
        </button>
        <button
          className={`tab ${activeTab === 'add-product' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('add-product')
            setEditingId(null)
            setNewProduct({
              name: '',
              price: '',
              originalPrice: '',
              imageUrl: '',
              category: 'long-khimar',
              sku: '',
              stock: ''
            })
            setSelectedFile(null)
          }}
        >
          {editingId ? 'Edit Product' : 'Add Product'}
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && (
          <div className="products-section">
            <h2>Products Management</h2>
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>SKU: {product.sku}</p>
                    <p>Price: ৳{product.price}</p>
                    <p>Stock: {product.stock}</p>
                    <p>Category: {product.category}</p>
                    <div className="product-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Orders Management</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order {order.orderId}</h3>
                    <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Customer:</strong> {order.customerName}</p>
                    <p><strong>Total:</strong> ৳{order.totalAmount}</p>
                    <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                    <p><strong>Shipping:</strong> {order.shippingAddress}</p>
                  </div>
                  <div className="order-items">
                    <h4>Items:</h4>
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <span>{item.productName} (x{item.quantity})</span>
                        <span>৳{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-actions">
                    <select 
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="status-select"
                    >
                      <option value="প্রক্রিয়াধীন">প্রক্রিয়াধীন</option>
                      <option value="প্রস্তুত">প্রস্তুত</option>
                      <option value="পাঠানো হয়েছে">পাঠানো হয়েছে</option>
                      <option value="সম্পন্ন">সম্পন্ন</option>
                      <option value="বাতিল">বাতিল</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'add-product' && (
          <div className="add-product-section">
            <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleAddProduct} className="product-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>SKU</label>
                <input
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price (৳)</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Original Price (৳)</label>
                <input
                  type="number"
                  value={newProduct.originalPrice}
                  onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <option value="long-khimar">Long Khimar</option>
                  <option value="hijab">Hijab</option>
                  <option value="innar-collection">Innar Collection</option>
                  <option value="three-piece">Three Piece</option>
                  <option value="islamic-item">Islamic Item</option>
                </select>
              </div>
              <div className="form-group">
                <label>Product Image</label>
                <div className="image-input-group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0])
                        setNewProduct(prev => ({...prev, imageUrl: ''}))
                      }
                    }}
                  />
                  <span>OR</span>
                  <input
                    type="text"
                    value={newProduct.imageUrl}
                    onChange={(e) => {
                      const val = e.target.value
                      setNewProduct(prev => ({...prev, imageUrl: val}))
                      setSelectedFile(null)
                    }}
                    placeholder="Enter image URL"
                    disabled={!!selectedFile}
                  />
                </div>
              </div>
              <button type="submit" className="submit-btn">{editingId ? 'Update Product' : 'Add Product'}</button>
              {editingId && <button type="button" className="cancel-btn" onClick={() => {
                setEditingId(null)
                setNewProduct({
                  name: '',
                  price: '',
                  originalPrice: '',
                  imageUrl: '',
                  category: 'long-khimar',
                  sku: '',
                  stock: ''
                })
                setSelectedFile(null)
                setActiveTab('products')
              }}>Cancel</button>}
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
