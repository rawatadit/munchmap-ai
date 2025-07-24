import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css';

function getTimeFilter() {
  const hour = new Date().getHours();
  if (hour < 11) return 'breakfast';
  if (hour < 16) return 'lunch';
  return 'dinner';
}

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const res = await fetch(`/api/places?lat=${coords.latitude}&lng=${coords.longitude}`);
      const data = await res.json();
      let items = data.results || [];
      const filter = getTimeFilter();
      items = items.filter(r => {
        const name = r.name.toLowerCase();
        if (filter === 'breakfast') return name.includes('breakfast') || name.includes('cafe');
        if (filter === 'lunch') return name.includes('lunch') || name.includes('cafe') || name.includes('deli');
        return name.includes('dinner') || true;
      });
      items = items.filter(r => r.rating >= 4);
      items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      setRestaurants(items);
    });
  }, []);

  const swHandlers = useSwipeable({
    onSwipedLeft: () => setIndex(i => Math.min(i + 1, restaurants.length - 1)),
    onSwipedRight: () => {
      if (restaurants[index]) setLiked([...liked, restaurants[index]]);
      setIndex(i => Math.min(i + 1, restaurants.length - 1));
    }
  });

  const current = restaurants[index];

  return (
    <div className="App" {...swHandlers}>
      {current ? (
        <div className="card">
          {current.photos && (
            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${current.photos[0].photo_reference}&key=YOUR_API_KEY_HERE`} alt={current.name} />
          )}
          <h2>{current.name}</h2>
          <p>Rating: {current.rating} ★</p>
          <p>{current.vicinity}</p>
          <p>{current.price_level ? 'Price: ' + current.price_level : ''}</p>
        </div>
      ) : (
        <p>No more restaurants</p>
      )}
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
