import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  useEffect(() => {
    if (category === 'All') {
      setFilteredItems(foodItems);
    } else {
      fetchFoodItemsByCategory(category);
    }
  }, [category, foodItems]);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost:9898/food');
      if (response.status === 200) {
        setFoodItems(response.data);
        setFilteredItems(response.data);
        setLoading(false); // Update loading state when data is fetched
      } else {
        throw new Error('Failed to fetch food items');
      }
    } catch (error) {
      console.error('Fetch food items error:', error);
    }
  };

  const fetchFoodItemsByCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:9898/food/${category}`);
      if (response.status === 200) {
        setFilteredItems(response.data);
      } else {
        throw new Error('Failed to fetch food items by category');
      }
    } catch (error) {
      console.error('Fetch food items by category error:', error);
      setFilteredItems([]);
    }
  };

  const addToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:9898/cart', item);
      if (response.status === 200) {
        // Update the item's status to 'In Cart' temporarily
        const updatedItems = filteredItems.map((filteredItem) => {
          if (filteredItem.FOOD_ITEM_ID === item.FOOD_ITEM_ID) {
            return { ...filteredItem, inCart: true };
          }
          return filteredItem;
        });
        setFilteredItems(updatedItems);

        // Set a timeout to revert the 'In Cart' status back to normal after 2 seconds
        setTimeout(() => {
          setFilteredItems((prevItems) =>
            prevItems.map((prevItem) => {
              if (prevItem.FOOD_ITEM_ID === item.FOOD_ITEM_ID) {
                return { ...prevItem, inCart: false };
              }
              return prevItem;
            })
          );
        }, 2000);
      } else {
        throw new Error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
    }
  };

  return (
    <div>
      <h2>Food Items</h2>
      <div>
        <button onClick={() => setCategory('All')}>All</button>
        <button onClick={() => setCategory('Breakfast')}>Breakfast</button>
        <button onClick={() => setCategory('Lunch')}>Lunch</button>
        <button onClick={() => setCategory('Dinner')}>Dinner</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredItems.map((item) => (
            <div
              key={item.FOOD_ITEM_ID}
              style={{
                margin: '10px',
                border: '1px solid #ccc',
                padding: '10px',
                width: '200px',
              }}
            >
              <img
                src={require(`./${item.FOOD_IMAGE}`)}
                alt={item.FOOD_NAME}
                style={{ width: '100%' }}
              />
              <h3>{item.FOOD_NAME}</h3>
              <p>Price: ${item.FOOD_PRICE}</p>
              <button
                onClick={() => addToCart(item)}
                style={{
                  backgroundColor: item.inCart ? 'yellow' : 'inherit',
                }}
              >
                {item.inCart ? 'In Cart' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      )}
      <Link to="/cart">
        <button>See Your Cart</button>
      </Link> 
      <span style={{ margin: '0 5px' }}></span>
      <Link to="/yourorders">
        <button>Your Orders</button>
      </Link>
    </div>
  );
};

export default FoodItems;
