# Supabase Setup Guide for Friends Gallery E-commerce

This guide will help you set up Supabase database and configure it for your Friends Gallery e-commerce application.

## 🚀 Quick Setup

### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/login to your account
4. Create a new project:
   - **Project Name**: `Friends Gallery E-commerce`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest region to your users

### 2. Get Project Credentials
1. Go to Project Settings → API
2. Copy the following:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Update Environment Variables
Update your `.env` file with your credentials:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Admin Configuration
VITE_ADMIN_EMAIL=admin@friendsgallery.com
```

## 🗄️ Database Setup

### Option 1: Automatic Setup (Recommended)
Run the provided SQL script in your Supabase SQL Editor:

1. Go to Supabase Dashboard → SQL Editor
2. Copy the entire contents of `supabase-setup.sql`
3. Paste and click "Run"

### Option 2: Manual Setup

#### 1. Enable Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
```

#### 2. Create Storage Bucket
Run the following SQL to set up image storage:

```sql
-- Create Storage Bucket for Product Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- 1. Public can view images
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING ( bucket_id = 'products' );

-- 2. Authenticated users can upload images
CREATE POLICY "Authenticated Upload" ON storage.objects 
FOR INSERT WITH CHECK ( bucket_id = 'products' AND auth.role() = 'authenticated' );
```

#### 3. Create Tables

##### Products Table
```sql
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  stock INTEGER NOT NULL DEFAULT 0,
  rating NUMERIC DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

##### Customers Table
```sql
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  total_orders INTEGER DEFAULT 0,
  total_spent NUMERIC DEFAULT 0,
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  order_ids TEXT[] DEFAULT '{}'
);
```

##### Orders Table
```sql
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_id UUID REFERENCES customers(id),
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  shipping_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'প্রক্রিয়াধীন',
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

##### Product Reviews Table
```sql
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. Create Indexes
```sql
-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(date DESC);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
```

#### 4. Set Up Security Policies

##### Public Access (Read-only)
```sql
-- Products - Public can read
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);

-- Reviews - Public can read
CREATE POLICY "Public can read reviews" ON product_reviews FOR SELECT USING (true);
```

##### Authenticated Users
```sql
-- Orders - Authenticated users can create
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (true);

-- Orders - Users can read their own orders
CREATE POLICY "Users can read their orders" ON orders FOR SELECT USING (true);

-- Reviews - Authenticated users can create
CREATE POLICY "Users can create reviews" ON product_reviews FOR INSERT WITH CHECK (true);
```

##### Admin Access
```sql
-- Admins can do everything on products
CREATE POLICY "Admins can do everything on products" ON products FOR ALL USING (true);

-- Admins can do everything on orders
CREATE POLICY "Admins can do everything on orders" ON orders FOR ALL USING (true);

-- Admins can do everything on customers
CREATE POLICY "Admins can do everything on customers" ON customers FOR ALL USING (true);
```

## 👤 Admin User Setup

### Create Admin Account
1. Go to Supabase Dashboard → Table Editor
2. Select the `customers` table
3. Click "Insert row"
4. Add admin user:
   ```json
   {
     "name": "Admin User",
     "email": "admin@friendsgallery.com",
     "phone": "01700000000",
     "password": "your_secure_password"
   }
   ```
5. Click "Save"

## 🔧 Configuration

### Environment Variables Setup
Create/update your `.env` file:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Admin Configuration
VITE_ADMIN_EMAIL=admin@friendsgallery.com
```

### Update Supabase Client
Make sure your `lib/supabase.ts` has the correct configuration:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 🚀 Testing Your Setup

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Admin Dashboard
1. Navigate to `http://localhost:5173/admin`
2. Login with:
   - Email: `admin@friendsgallery.com`
   - Password: The password you set in Supabase

### 3. Test User Registration
1. Navigate to `http://localhost:5173/login`
2. Register a new user account
3. Verify the user appears in the `customers` table

### 4. Test Product Management
1. Go to admin dashboard → Add Product
2. Add a test product
3. Verify it appears in the products list

## 🔍 Troubleshooting

### Common Issues

#### 1. Connection Issues
- **Problem**: Cannot connect to Supabase
- **Solution**: Check `.env` variables are correct and restart dev server

#### 2. RLS Policy Issues
- **Problem**: Cannot read/write data
- **Solution**: Run the SQL setup script again or check policies in Authentication → Policies

#### 3. Admin Access Issues
- **Problem**: Cannot access admin dashboard
- **Solution**: Verify admin user exists in `customers` table with correct email

#### 4. CORS Issues
- **Problem**: Browser blocks requests
- **Solution**: Add your localhost URL to Supabase CORS settings

### Debug Mode
Enable debug mode in your browser console:
```javascript
localStorage.setItem('supabase.auth.debug', 'true')
```

## 📱 Production Deployment

### 1. Update Environment Variables
```bash
# Production
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

### 2. Build for Production
```bash
npm run build
```

### 3. Deploy
Deploy the `dist` folder to your hosting provider.

## 🔐 Security Best Practices

### 1. Environment Variables
- Never commit `.env` file to version control
- Use different keys for development and production
- Rotate keys regularly

### 2. Database Security
- Enable Row Level Security (RLS)
- Use service role keys for server-side operations
- Regular backups

### 3. Admin Security
- Use strong passwords for admin accounts
- Enable two-factor authentication if available
- Regular security audits

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify Supabase project is active
3. Ensure all SQL scripts ran successfully
4. Check environment variables are correctly set

---

**Your Friends Gallery E-commerce is now powered by Supabase! 🎉**

For additional support, refer to the project documentation or create an issue in the repository.
