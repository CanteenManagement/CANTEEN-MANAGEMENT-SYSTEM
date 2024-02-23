import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:9898/orders');
      if (response.status === 200) {
        setOrders(response.data);
        setLoading(false);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
    }
  };

  return (
    <div>
      <h2>Your Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div>
              {orders.map(order => (
                <div key={order.ORDER_ID} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                  <h3>{order.FOOD_NAME}</h3>
                  <p>Price: ${order.FOOD_PRICE}</p>
                  <p>Quantity: {order.Quantity}</p>
                  <img src={require(`./${order.FOOD_IMAGE}`)} alt={order.FOOD_NAME} style={{ width: '100px', marginRight: '10px' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YourOrders;
