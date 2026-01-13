const API_URL = import.meta.env.REACT_APP_WORDPRESS_GRAPHQL_URL;

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  // ১. চেক করা হচ্ছে URL ঠিক আছে কিনা
  if (!API_URL) {
    throw new Error('API_URL is missing! Please check .env file for REACT_APP_WORDPRESS_GRAPHQL_URL');
  }

  // ২. কনসোলে প্রিন্ট করে দেখা হচ্ছে কী পাঠানো হচ্ছে
  console.log("Sending query to:", API_URL);
  
  const res = await fetch(API_URL, {
    method: 'POST', // অবশ্যই POST হতে হবে
    headers,
    body: JSON.stringify({
      query: query, // কুয়েরিটি এখানে যাচ্ছে
      variables: variables,
    }),
    cache: 'no-store',
  });

  const json = await res.json();
  
  if (json.errors) {
    console.error("WPGraphQL Errors:", json.errors);
    throw new Error('Failed to fetch API: ' + json.errors.map((e:any) => e.message).join(', '));
  }
  return json.data;
}

export async function getProducts() {
  const query = `
    query GetProducts {
      products(first: 20) {
        nodes {
          id
          name
          slug
          ... on SimpleProduct {
            price
            regularPrice
          }
          ... on VariableProduct {
            price
            regularPrice
          }
          image {
            sourceUrl
          }
        }
      }
    }
  `;
  
  const data = await fetchAPI(query);
  return data?.products?.nodes;
}