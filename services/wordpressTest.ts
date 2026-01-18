/**
 * WordPress GraphQL Connection Test Utility
 * Use this to verify your WordPress GraphQL endpoint is working
 */

const graphqlUrl = import.meta.env.REACT_APP_WORDPRESS_GRAPHQL_URL;
const token = import.meta.env.REACT_APP_WORDPRESS_AUTH_TOKEN;

export const testWordPressConnection = async () => {
  if (!graphqlUrl) {
    console.error('❌ REACT_APP_WORDPRESS_GRAPHQL_URL not set in .env.local');
    return false;
  }

  try {
    console.log(`🔍 Testing WordPress GraphQL connection at: ${graphqlUrl}`);

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({
        query: '{ generalSettings { title url } }'
      })
    });

    const data = await response.json();

    if (data.errors) {
      console.error('❌ GraphQL Error:', data.errors);
      return false;
    }

    if (data.data?.generalSettings) {
      console.log('✅ WordPress Connected!');
      console.log('📝 Site Title:', data.data.generalSettings.title);
      console.log('🔗 Site URL:', data.data.generalSettings.url);
      return true;
    }

    console.warn('⚠️ Unexpected response:', data);
    return false;
  } catch (error) {
    console.error('❌ Connection Failed:', error);
    return false;
  }
};

export const testProductsQuery = async () => {
  if (!graphqlUrl) {
    console.error('❌ REACT_APP_WORDPRESS_GRAPHQL_URL not set in .env.local');
    return null;
  }

  try {
    console.log('🔍 Testing Products query...');

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({
        query: `{
          products(first: 3) {
            edges {
              node {
                id
                databaseId
                name
                ... on SimpleProduct {
                  price
                  regularPrice
                  salePrice
                  stockStatus
                }
                ... on VariableProduct {
                  price
                  regularPrice
                  salePrice
                  stockStatus
                }
                image {
                  sourceUrl
                }
              }
            }
          }
        }`
      })
    });

    const data = await response.json();

    if (data.errors) {
      console.error('❌ Products Query Error:', data.errors);
      return null;
    }

    if (data.data?.products?.edges) {
      console.log('✅ Products Retrieved!');
      console.log('📦 Total products in first 3:', data.data.products.edges.length);
      data.data.products.edges.forEach((edge, i) => {
        const product = edge.node;
        console.log(`  ${i + 1}. ${product.name} - $${product.price}`);
      });
      return data.data.products.edges;
    }

    console.warn('⚠️ No products found');
    return [];
  } catch (error) {
    console.error('❌ Products Query Failed:', error);
    return null;
  }
};

export const testCategoriesQuery = async () => {
  if (!graphqlUrl) {
    console.error('❌ REACT_APP_WORDPRESS_GRAPHQL_URL not set in .env.local');
    return null;
  }

  try {
    console.log('🔍 Testing Categories query...');

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({
        query: `{
          productCategories(first: 10) {
            edges {
              node {
                id
                name
                slug
                count
                image {
                  sourceUrl
                }
              }
            }
          }
        }`
      })
    });

    const data = await response.json();

    if (data.errors) {
      console.error('❌ Categories Query Error:', data.errors);
      return null;
    }

    if (data.data?.productCategories?.edges) {
      console.log('✅ Categories Retrieved!');
      console.log('📂 Total categories:', data.data.productCategories.edges.length);
      data.data.productCategories.edges.forEach((edge, i) => {
        const category = edge.node;
        console.log(`  ${i + 1}. ${category.name} (${category.count} products)`);
      });
      return data.data.productCategories.edges;
    }

    console.warn('⚠️ No categories found');
    return [];
  } catch (error) {
    console.error('❌ Categories Query Failed:', error);
    return null;
  }
};

/**
 * Run all connection tests
 * Call this once on app startup to verify everything is working
 */
export const runAllTests = async () => {
  console.log('\n🧪 Running WordPress GraphQL Connection Tests...\n');

  const connectionOk = await testWordPressConnection();
  if (!connectionOk) return false;

  console.log('\n');
  const productsOk = await testProductsQuery();

  console.log('\n');
  const categoriesOk = await testCategoriesQuery();

  console.log('\n✅ All tests completed!\n');

  return connectionOk && productsOk && categoriesOk;
};
