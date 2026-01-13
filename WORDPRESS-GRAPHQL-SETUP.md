# WordPress GraphQL Integration Setup Guide

## Overview
This guide explains how to integrate your local WordPress site with WooCommerce GraphQL to manage all your e-commerce content (products, categories, orders) from WordPress, while your React/Next.js app fetches data via GraphQL.

## Prerequisites
1. **WordPress Installation** with:
   - WooCommerce plugin installed
   - WPGraphQL plugin (Free: https://www.wpgraphql.com/)
   - WPGraphQL for WooCommerce (Free: https://github.com/wp-graphql/wp-graphql-woocommerce)

2. **Local WordPress Server** running on `http://localhost:10003` (adjust URL in `.env` if different)

## Installation Steps

### 1. Install Required WordPress Plugins
In your WordPress admin panel:
1. Go to **Plugins** → **Add New**
2. Search and install:
   - **WPGraphQL** (by WP Engine)
   - **WPGraphQL for WooCommerce** (Community)
3. Activate both plugins

### 2. Configure Your React App

Create a `.env.local` file in your project root:
```
REACT_APP_WORDPRESS_GRAPHQL_URL=http://localhost:10003/graphql
```

### 3. Add WordPress Products to Your Site

The integration supports:
- **Products** - All WooCommerce products with images, prices, descriptions, reviews
- **Categories** - Product categories from WooCommerce
- **Orders** - Customer orders (with proper authentication)
- **Reviews** - Product reviews and ratings

### 4. How to Use in Your Components

#### Get All Products:
```typescript
import { wordpressProductService } from '../services/wordpressGraphQL';

const products = await wordpressProductService.getAllProducts(20);
```

#### Get Products by Category:
```typescript
const categoryProducts = await wordpressProductService.getProductsByCategory('long-khimar', 20);
```

#### Search Products:
```typescript
const searchResults = await wordpressProductService.searchProducts('khimar', 20);
```

#### Get All Categories:
```typescript
import { wordpressCategoryService } from '../services/wordpressGraphQL';

const categories = await wordpressCategoryService.getAllCategories();
```

#### Get Customer Orders:
```typescript
import { wordpressOrderService } from '../services/wordpressGraphQL';

const orders = await wordpressOrderService.getCustomerOrders(customerId);
```

## API Mapping

Your WordPress GraphQL data will be automatically mapped to your app's TypeScript types:

### Product Fields
- `databaseId` → `id` (as `prod_${databaseId}`)
- `name` → `name`
- `salePrice/regularPrice` → `price`/`originalPrice`
- `image.sourceUrl` → `imageUrl`
- `productCategories[0].slug` → `category`
- `slug` → `sku`
- `averageRating` → `rating`
- `reviewCount` → `reviewCount`

### Category Fields
- `slug` → `id`
- `name` → `name`
- `image.sourceUrl` → `imageUrl`
- `count` → `count` (number of products in category)

## Key Features

✅ **Real-time Data**: All data comes directly from your WordPress admin
✅ **Full WooCommerce Support**: Products, categories, inventory, pricing
✅ **Product Images**: Gallery images and featured images
✅ **Reviews & Ratings**: Built-in product reviews system
✅ **Scalable**: GraphQL pagination support for large catalogs
✅ **Secure**: Option to add authentication tokens for sensitive queries
✅ **Flexible**: Easy to customize queries based on your needs

## Testing

### Test GraphQL Endpoint
Open `http://localhost:10003/graphql` in your browser to access GraphiQL IDE for testing queries.

### Example Test Query:
```graphql
{
  products(first: 5) {
    edges {
      node {
        id
        name
        price
        image {
          sourceUrl
        }
      }
    }
  }
}
```

## Troubleshooting

### Issue: CORS Errors
**Solution**: Add CORS headers in your WordPress `.htaccess` or use a CORS proxy during development.

### Issue: Authentication Required
**Solution**: Add authentication token in `.env`:
```
REACT_APP_WORDPRESS_AUTH_TOKEN=your_jwt_token
```

### Issue: Blank Products
**Solution**: Ensure WooCommerce products have:
- Product name
- Price
- Featured image
- Valid category

## Future Enhancements

The following can be added:
- [ ] Mutation for creating orders from the frontend
- [ ] Authentication flow for customer accounts
- [ ] Wishlist management
- [ ] Product recommendations based on WooCommerce data
- [ ] Inventory management
- [ ] Shipping calculation integration

## Support

For issues with GraphQL queries, check:
1. WordPress error logs
2. GraphiQL IDE at `http://localhost:10003/graphql`
3. Browser console for network errors

---

**Note**: The WordPress URL should match your local setup. Default is `http://localhost:10003` but adjust as needed.
