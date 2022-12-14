export const fetchProducts = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`);
  const products = await response.json();
  return products;
};

export const fetchSellers = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/seller`);
  const products = await response.json();
  return products;
};

export const fetchOrderBySaleId = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/customer/orders/${id}`);
  const products = await response.json();
  return products;
};

export const fetchSellerOrderDetail = async (sellerId, saleId) => {
  const response = await
  fetch(`${process.env.REACT_APP_BASE_URL}/seller/${sellerId}/orders/${saleId}`);
  const products = await response.json();
  return products;
};

export const fetchCustomerOrders = async (userToken) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/customer/orders`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: userToken,
    },
  });

  const orders = await response.json();
  return orders;
};
export const fetchSellersOrders = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/seller/${id}`);
  const products = await response.json();
  return products;
};

export const fetchAdmin = async (userToken) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/manage`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: userToken,
    },
  });

  const users = await response.json();
  return users;
};
