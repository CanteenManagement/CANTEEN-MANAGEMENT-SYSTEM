import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory(); 

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    // Calculate total price whenever cartItems changes
    calculateTotalPrice();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:9898/cart');
      if (response.status === 200) {
        setCartItems(response.data);
        setLoading(false);
      } else {
        throw new Error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Fetch cart items error:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:9898/cart/${itemId}`);
      if (response.status === 200) {
        console.log(`Remove item ${itemId} from the cart`);
        fetchCartItems();
      } else {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
    }
  };

  const increaseQuantity = (item) => {
    // Increase the quantity of the item by 1
    item.quantity = (item.quantity || 1) + 1;
    setCartItems([...cartItems]); // Update state to trigger re-render
  };

  const decreaseQuantity = (item) => {
    // Decrease the quantity of the item by 1, with a minimum limit of 1
    item.quantity = Math.max((item.quantity || 1) - 1, 1);
    setCartItems([...cartItems]); // Update state to trigger re-render
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += (item.FOOD_PRICE * (item.quantity || 1));
    });
    return totalPrice;
  };

  const handleOrderNow = async () => {
    try {
      const data = cartItems.map(item => ({
        FOOD_NAME: item.FOOD_NAME,
        FOOD_PRICE: item.FOOD_PRICE,
        FOOD_IMAGE: item.FOOD_IMAGE,
        Quantity: item.quantity || 1 // Default to 1 if quantity is not set
      }));
      await Promise.all(cartItems.map(item =>
        axios.delete(`http://localhost:9898/cart/${item.FOOD_ITEM_ID}`)
      ));
      
      const response = await axios.post('http://localhost:9898/orders', data);
  
      if (response.status === 200) {
        console.log('Order placed successfully!');
        // Optionally, you can clear the cart or perform any other actions after placing the order
        history.push('/fooditems');
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      console.error('Order Now error:', error);
    }
  };
  
  
  return (
    <div>
      <h2>Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item.FOOD_ITEM_ID} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                  <img src={require(`./${item.FOOD_IMAGE}`)} alt={item.FOOD_NAME} style={{ width: '100px', marginRight: '10px' }} />
                  <div>
                    <h3>{item.FOOD_NAME}</h3>
                    <p>Price: ${item.FOOD_PRICE}</p>
                    <label>Quantity:</label>
                    <input
                      type="number"
                      value={item.quantity || 1}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        item.quantity = newQuantity > 0 ? newQuantity : 1;
                        setCartItems([...cartItems]); // Update state to trigger re-render
                      }}
                      style={{ marginRight: '10px', width: '60px' }}
                    />
                    <button onClick={() => increaseQuantity(item)}>+</button>
                    <span style={{ margin: '0 5px' }}></span>
                    <button onClick={() => decreaseQuantity(item)}>-</button>
                    <span style={{ margin: '0 5px' }}></span>
                    
                    <button onClick={() => removeFromCart(item.FOOD_ITEM_ID)}>Remove</button>
                  </div>
                </div>
              ))}
              <div>Total Price: ${calculateTotalPrice()}</div>
              <br></br>
              <button onClick={handleOrderNow}>Order Now</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
