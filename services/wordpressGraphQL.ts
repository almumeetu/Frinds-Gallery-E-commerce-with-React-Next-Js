// WordPress GraphQL Configuration
const WORDPRESS_GRAPHQL_ENDPOINT = import.meta.env.REACT_APP_WORDPRESS_GRAPHQL_URL || 'http://localhost:10003/graphql';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

// GraphQL Query for Products
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          databaseId
          name
          slug
          description
          shortDescription
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
            onSale
          }
          ... on VariableProduct {
            price
            regularPrice
            salePrice
            onSale
          }
          image {
            sourceUrl
            altText
          }
          productCategories(first: 1) {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
          attributes(first: 10) {
            edges {
              node {
                name
                options
              }
            }
          }
          reviews(first: 5) {
            edges {
              node {
                id
                content
                date
                ... on Review {
                   author {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
          stockStatus
          totalSales
          reviewCount
          averageRating
        }
      }
    }
  }
`;

// GraphQL Query for Categories
const CATEGORIES_QUERY = `
  query GetCategories($first: Int!) {
    productCategories(first: $first) {
      edges {
        node {
          id
          databaseId
          name
          slug
          description
          image {
            sourceUrl
            altText
          }
          count
        }
      }
    }
  }
`;

// GraphQL Query for Single Product
const PRODUCT_BY_SLUG_QUERY = `
  query GetProductBySlug($slug: String!) {
    productBySlug(slug: $slug) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        onSale
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
        onSale
      }
      image {
        sourceUrl
        altText
      }
      galleryImages(first: 10) {
        edges {
          node {
            sourceUrl
            altText
          }
        }
      }
      productCategories(first: 5) {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
      attributes(first: 10) {
        edges {
          node {
            id
            name
            options
          }
        }
      }
      reviews(first: 10) {
        edges {
          node {
            id
            content
            date
            ... on Review {
              author {
                node {
                  name
                }
              }
            }
          }
        }
      }
      stockStatus
      totalSales
      reviewCount
      averageRating
    }
  }
`;

// GraphQL Query for Orders (requires authentication)
const ORDERS_QUERY = `
  query GetOrders {
    orders(first: 20) {
      edges {
        node {
          id
          databaseId
          orderNumber
          date
          status
          total
          subtotal
          shippingTotal
          discountTotal
          customer {
            id
            firstName
            lastName
            email
            billing {
              address1
              address2
              city
              country
              postcode
              phone
            }
            shipping {
              address1
              address2
              city
              country
              postcode
            }
          }
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
                total
                product {
                  node {
                    id
                    name
                    image {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Generic GraphQL fetch function
export const fetchGraphQL = async <T>(
  query: string,
  variables?: Record<string, any>
): Promise<T | null> => {
  try {
    const response = await fetch(WORDPRESS_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL Error');
    }

    return result.data || null;
  } catch (error) {
    console.error('GraphQL Fetch Error:', error);
    return null;
  }
};

// Helper to convert WordPress product to app Product type
export const mapWordPressProduct = (wpProduct: any): any => {
  if (!wpProduct) return null; // Safety check
  const category = wpProduct.productCategories?.edges?.[0]?.node;
  // Handle price parsing safely - removing non-numeric characters like currency symbols
  const parsePrice = (priceString: string | null | undefined): number => {
    if (!priceString) return 0;
    // Remove "৳" symbol, commas, and other non-numeric chars except dot
    const cleanPrice = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(cleanPrice) || 0;
  };

  return {
    id: `prod_${wpProduct.databaseId}`,
    name: wpProduct.name,
    price: parsePrice(wpProduct.salePrice || wpProduct.price || wpProduct.regularPrice),
    originalPrice: parsePrice(wpProduct.regularPrice || wpProduct.price),
    imageUrl: wpProduct.image?.sourceUrl || '/images/products/default.webp',
    category: category?.slug || 'uncategorized',
    sku: wpProduct.slug,
    stock: wpProduct.stockStatus === 'IN_STOCK' ? 99 : 0, // FIXED: Correct enum check
    rating: parseFloat(wpProduct.averageRating || '0'),
    reviewCount: wpProduct.reviewCount || 0,
    description: wpProduct.description,
    shortDescription: wpProduct.shortDescription,
  };
};

// Helper to convert WordPress category to app Category type
export const mapWordPressCategory = (wpCategory: any): any => {
  return {
    id: wpCategory.slug,
    name: wpCategory.name,
    imageUrl: wpCategory.image?.sourceUrl || '/images/category/default.webp',
    count: wpCategory.count,
  };
};

// WordPress Product Service
export const wordpressProductService = {
  // Get all products
  async getAllProducts(limit: number = 20): Promise<any[]> {
    const result = await fetchGraphQL<any>(PRODUCTS_QUERY, {
      first: limit,
    });

    if (!result?.products?.edges) return [];
    
    return result.products.edges.map((edge: any) => mapWordPressProduct(edge.node));
  },

  // Get products by category
  async getProductsByCategory(categorySlug: string, limit: number = 20): Promise<any[]> {
    const query = `
      query GetProductsByCategory($slug: String!, $first: Int!) {
        productCategory(slug: $slug) {
          products(first: $first) {
            edges {
              node {
                id
                databaseId
                name
                slug
                ... on SimpleProduct {
                  price
                  regularPrice
                  salePrice
                }
                ... on VariableProduct {
                  price
                  regularPrice
                  salePrice
                }
                image {
                  sourceUrl
                  altText
                }
                productCategories(first: 1) {
                  edges {
                    node {
                      slug
                    }
                  }
                }
                reviewCount
                averageRating
              }
            }
          }
        }
      }
    `;

    const result = await fetchGraphQL<any>(query, {
      slug: categorySlug,
      first: limit,
    });

    if (!result?.productCategory?.products?.edges) return [];
    
    return result.productCategory.products.edges.map((edge: any) => mapWordPressProduct(edge.node));
  },

  // Get product by ID
  async getProductById(id: string): Promise<any | null> {
    const databaseId = id.replace('prod_', '');
    const query = `
      query GetProductById($id: ID!) {
        product(id: $id) {
          id
          databaseId
          name
          slug
          description
          shortDescription
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
          }
          ... on VariableProduct {
            price
            regularPrice
            salePrice
          }
          image {
            sourceUrl
            altText
          }
          galleryImages(first: 10) {
            edges {
              node {
                sourceUrl
                altText
              }
            }
          }
          productCategories(first: 5) {
            edges {
              node {
                name
                slug
              }
            }
          }
          attributes(first: 10) {
            edges {
              node {
                name
                options
              }
            }
          }
          reviews(first: 10) {
            edges {
              node {
                id
                title
                content
                rating
                reviewer
                date
              }
            }
          }
          reviewCount
          averageRating
          stockStatus
        }
      }
    `;

    const result = await fetchGraphQL<any>(query, {
      id: `gid://woocommerce/product/${databaseId}`,
    });

    return result?.product ? mapWordPressProduct(result.product) : null;
  },

  // Search products
  async searchProducts(query: string, limit: number = 20): Promise<any[]> {
    const searchQuery = `
      query SearchProducts($search: String!, $first: Int!) {
        products(first: $first, where: { search: $search }) {
          edges {
            node {
              id
              databaseId
              name
              slug
              description
              shortDescription
              ... on SimpleProduct {
                price
                regularPrice
                salePrice
              }
              ... on VariableProduct {
                price
                regularPrice
                salePrice
              }
              image {
                sourceUrl
                altText
              }
              reviewCount
              averageRating
            }
          }
        }
      }
    `;

    const result = await fetchGraphQL<any>(searchQuery, {
      search: query,
      first: limit,
    });

    if (!result?.products?.edges) return [];
    
    return result.products.edges.map((edge: any) => mapWordPressProduct(edge.node));
  },
};

// WordPress Category Service
export const wordpressCategoryService = {
  // Get all categories
  async getAllCategories(): Promise<any[]> {
    const result = await fetchGraphQL<any>(CATEGORIES_QUERY, {
      first: 50,
    });

    if (!result?.productCategories?.edges) return [];
    
    return result.productCategories.edges.map((edge: any) => mapWordPressCategory(edge.node));
  },
};

// WordPress Order Service (for customer orders)
export const wordpressOrderService = {
  // Get customer orders (requires authentication)
  async getCustomerOrders(customerId?: string): Promise<any[]> {
    if (!customerId) return [];

    const query = `
      query GetCustomerOrders($customerId: ID!) {
        customer(id: $customerId) {
          orders(first: 20) {
            edges {
              node {
                id
                databaseId
                orderNumber
                date
                status
                total
                lineItems(first: 10) {
                  edges {
                    node {
                      id
                      title
                      quantity
                      total
                      product {
                        node {
                          name
                          image {
                            sourceUrl
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const result = await fetchGraphQL<any>(query, {
      customerId,
    });

    if (!result?.customer?.orders?.edges) return [];
    
    return result.customer.orders.edges.map((edge: any) => ({
      id: edge.node.databaseId,
      orderId: `ORD-${edge.node.orderNumber}`,
      date: edge.node.date,
      status: edge.node.status,
      totalAmount: parseFloat(edge.node.total),
      items: edge.node.lineItems.edges.map((item: any) => ({
        productName: item.node.product?.node?.name || item.node.title,
        quantity: item.node.quantity,
        price: parseFloat(item.node.total),
      })),
    }));
  },
};
