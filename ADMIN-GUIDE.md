# 👨‍💼 Admin Guide - Manage Your Store

## 🗄️ Access Your Database

**Supabase Dashboard:** https://gkvzcmhtsbhvydtdapxu.supabase.co

---

## 📦 Managing Products

### Add New Product

1. Go to: https://gkvzcmhtsbhvydtdapxu.supabase.co/project/gkvzcmhtsbhvydtdapxu/editor
2. Click **"products"** table
3. Click **"Insert"** → **"Insert row"**
4. Fill in:
   - **name**: Product name (e.g., "স্মার্ট ওয়াচ")
   - **price**: Selling price (e.g., 2999)
   - **original_price**: Original price (optional, e.g., 3999)
   - **image_url**: Product image URL
   - **category**: Category name (e.g., "ইলেকট্রনিক্স")
   - **sku**: Unique product code (e.g., "WATCH-001")
   - **stock**: Available quantity (e.g., 50)
   - **rating**: Average rating (0-5)
   - **review_count**: Number of reviews
5. Click **"Save"**

### Edit Product

1. Go to products table
2. Click on the row you want to edit
3. Click **"Edit"** icon
4. Update fields
5. Click **"Save"**

### Delete Product

1. Go to products table
2. Click on the row
3. Click **"Delete"** icon
4. Confirm deletion

---

## 📋 Managing Orders

### View All Orders

1. Go to: https://gkvzcmhtsbhvydtdapxu.supabase.co/project/gkvzcmhtsbhvydtdapxu/editor
2. Click **"orders"** table
3. See all orders with:
   - Order ID
   - Customer name
   - Total amount
   - Status
   - Date

### Update Order Status

1. Go to orders table
2. Click on the order row
3. Click **"Edit"**
4. Change **"status"** field to:
   - `প্রক্রিয়াধীন` (Processing)
   - `শিপিং-এ` (Shipped)
   - `পৌঁছে গেছে` (Delivered)
   - `বাতিল` (Cancelled)
5. Click **"Save"**

### View Order Details

Click on any order to see:
- Customer information
- Ordered items (in JSON format)
- Shipping address
- Payment status
- Order date

---

## 👥 Managing Customers

### View All Customers

1. Go to **"customers"** table
2. See customer information:
   - Name
   - Email
   - Phone
   - Total orders
   - Total spent
   - Join date

### View Customer Orders

1. Note the customer's `id`
2. Go to **"orders"** table
3. Filter by `customer_id`

---

## 📊 Sales Analytics

### Total Sales

1. Go to orders table
2. Look at `total_amount` column
3. Sum up all completed orders

### Best Selling Products

1. Go to orders table
2. Check `items` field (JSON)
3. Count product IDs

### Customer Statistics

1. Go to customers table
2. Sort by `total_spent` (descending)
3. See top customers

---

## 🖼️ Managing Product Images

### Option 1: Use External URLs (Easiest)

Use image URLs from:
- Unsplash: https://unsplash.com
- Your own hosting
- Imgur: https://imgur.com

### Option 2: Upload to Supabase Storage

1. Go to: Storage → Create bucket "products"
2. Upload images
3. Get public URL
4. Use URL in product `image_url` field

---

## 🔍 Useful SQL Queries

### Get Total Sales
```sql
SELECT SUM(total_amount) as total_sales 
FROM orders 
WHERE status = 'পৌঁছে গেছে';
```

### Get Top Products
```sql
SELECT name, stock, rating, review_count 
FROM products 
ORDER BY rating DESC, review_count DESC 
LIMIT 10;
```

### Get Recent Orders
```sql
SELECT * FROM orders 
ORDER BY date DESC 
LIMIT 20;
```

### Low Stock Alert
```sql
SELECT name, stock, sku 
FROM products 
WHERE stock < 10 
ORDER BY stock ASC;
```

Run these in: SQL Editor → New Query

---

## 🔐 Security Tips

### Protect Admin Access

1. Don't share your Supabase credentials
2. Use Row Level Security (RLS) policies
3. Create separate admin user role
4. Enable 2FA on Supabase account

### Backup Your Data

1. Go to: Database → Backups
2. Enable automatic backups
3. Download manual backup weekly

---

## 📱 Mobile Management

You can manage your store from phone:
1. Open Supabase dashboard on mobile browser
2. Login to your account
3. Access Table Editor
4. Edit products/orders on the go

---

## 🆘 Common Tasks

### Product Out of Stock?
1. Go to products table
2. Find the product
3. Update `stock` field to new quantity

### Customer Wants to Cancel Order?
1. Go to orders table
2. Find the order by `order_id`
3. Change status to `বাতিল`

### Wrong Price on Product?
1. Go to products table
2. Find the product
3. Update `price` field

### Add Product Category?
Just use the category name in the `category` field. The app will automatically group products by category.

---

## 📈 Growth Tips

### Increase Sales
1. Add more product images
2. Write detailed descriptions
3. Offer discounts (use `original_price`)
4. Keep stock updated
5. Respond to orders quickly

### Improve Customer Experience
1. Update order status promptly
2. Add product reviews
3. Keep accurate stock levels
4. Fast shipping

---

## 🔄 Regular Maintenance

### Daily
- Check new orders
- Update order statuses
- Reply to customer inquiries

### Weekly
- Add new products
- Update stock levels
- Check low stock items
- Review sales data

### Monthly
- Backup database
- Review customer feedback
- Analyze best sellers
- Plan promotions

---

## 📞 Need Help?

- **Supabase Docs:** https://supabase.com/docs
- **SQL Tutorial:** https://www.w3schools.com/sql/
- **Table Editor Guide:** https://supabase.com/docs/guides/database/tables

---

**Happy Selling! 🎉**
