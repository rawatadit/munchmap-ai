/**
 * Restaurant Swipe App - Frontend React Component
 * 
 * Main React component that provides a Tinder-style interface for restaurant discovery.
 * Users can swipe through restaurant cards or use action buttons to like/pass restaurants.
 * 
 * Features:
 * - Touch-friendly swipe gestures
 * - Click-based action buttons
 * - Loading states and error handling
 * - Responsive design
 * - Time-based restaurant filtering
 * - Liked restaurants tracking
 */

import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';

/**
 * Determines appropriate meal filter based on current time
 * @returns {string} 'breakfast', 'lunch', or 'dinner'
 */
function getTimeFilter() {
  const hour = new Date().getHours();
  if (hour < 11) return 'breakfast';
  if (hour < 16) return 'lunch';
  return 'dinner';
}

function App() {
  // State management
  const [restaurants, setRestaurants] = useState([]);  // Array of restaurant objects
  const [index, setIndex] = useState(0);               // Current restaurant index being viewed
  const [liked, setLiked] = useState([]);              // Array of liked restaurants
  const [loading, setLoading] = useState(true);        // Loading state for API call

  // Fetch restaurants on component mount
  useEffect(() => {
    /**
     * Fetches restaurant data from backend API - SIMPLIFIED FOR DEBUGGING
     */
    const fetchRestaurants = async () => {
      try {
        console.log('🔄 Starting API call...');
        const res = await fetch('http://localhost:3001/api/places?lat=37.7749&lng=-122.4194');
        console.log('📡 API response received, status:', res.status);
        
        const data = await res.json();
        console.log('📊 Raw data:', data);
        
        let items = data.results || [];
        console.log('🍽️ Number of restaurants:', items.length);
        
        // SIMPLIFIED FILTERING - Only remove truly bad restaurants
        items = items.filter(r => r.rating && r.rating >= 3.5);
        console.log('⭐ After basic filtering:', items.length);
        
        // Sort by rating (highest first)
        items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        
        console.log('✅ Final restaurants to display:', items.length);
        if (items.length > 0) {
          console.log('🎯 First restaurant:', items[0].name, '-', items[0].rating, '⭐');
        }
        
        setRestaurants(items);
        setLoading(false);
      } catch (error) {
        console.error('❌ API Error:', error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Swipe gesture handlers using react-swipeable
  const swHandlers = useSwipeable({
    // Swipe left = Pass (move to next restaurant)
    onSwipedLeft: () => setIndex(i => Math.min(i + 1, restaurants.length - 1)),
    // Swipe right = Like (add to favorites and move to next)
    onSwipedRight: () => {
      if (restaurants[index]) setLiked([...liked, restaurants[index]]);
      setIndex(i => Math.min(i + 1, restaurants.length - 1));
    }
  });

  /**
   * Handles "Pass" button click - moves to next restaurant without liking
   */
  const handlePass = () => {
    setIndex(i => Math.min(i + 1, restaurants.length - 1));
  };

  /**
   * Handles "Like" button click - adds current restaurant to favorites and moves to next
   */
  const handleLike = () => {
    if (restaurants[index]) setLiked([...liked, restaurants[index]]);
    setIndex(i => Math.min(i + 1, restaurants.length - 1));
  };

  // Get current restaurant being viewed
  const current = restaurants[index];

  return (
    <div className="App">
      <h1>🍽️ Restaurant Swipe</h1>
      <p className="instructions">Swipe right to like • Swipe left to pass</p>
      
      <div {...swHandlers}>
        {loading ? (
          <div className="loading">
            <p>🔍 Finding delicious restaurants...</p>
          </div>
        ) : current ? (
          <>
            <div className="card">
              {current.photos && current.photos[0].photo_reference.startsWith('dummy') ? (
                <div className="dummy-photo">
                  <span>📸 {current.name} Photo</span>
                </div>
              ) : current.photos ? (
                <img 
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${current.photos[0].photo_reference}&key=AIzaSyDZ0-QVftmk35e_-k2PR6olyQJFNzin8tc`} 
                  alt={current.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              {current.photos && (
                <div className="dummy-photo" style={{display: 'none'}}>
                  <span>📸 {current.name} Photo</span>
                </div>
              )}
              <h2>{current.name}</h2>
              <p>Rating: {current.rating} ★</p>
              <p>{current.vicinity}</p>
              <p>{current.price_level ? 'Price: ' + '💰'.repeat(current.price_level) : 'Price: Not specified'}</p>
            </div>
            
            <div className="action-buttons">
              <button className="pass-btn" onClick={handlePass}>
                ❌ Pass
              </button>
              <button className="like-btn" onClick={handleLike}>
                ❤️ Like
              </button>
            </div>
          </>
        ) : (
          <div className="no-more">
            <p>🎉 No more restaurants!</p>
            <p>Check your liked list below 👇</p>
          </div>
        )}
      </div>
      
      {liked.length > 0 && (
        <div className="liked">
          <h3>Liked Restaurants:</h3>
          <ul>
            {liked.map(r => (
              <li key={r.place_id}>{r.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
