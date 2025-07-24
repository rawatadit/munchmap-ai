/**
 * Restaurant Swipe App - Backend Server
 * 
 * Express.js server that provides restaurant data via Google Places API
 * with fallback to dummy data for development and testing.
 * 
 * Features:
 * - CORS enabled for frontend communication
 * - Google Places API integration
 * - Dummy data fallback for testing
 * - Restaurant filtering and sorting
 */

const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

const app = express();

// Enable CORS for all routes (allows frontend to call backend)
app.use(cors());

// Load Google Places API key from environment variables
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'YOUR_API_KEY_HERE';

// Dummy restaurant data for testing
const dummyRestaurants = {
  results: [
    {
      place_id: 'dummy1',
      name: 'The Golden Spoon',
      rating: 4.5,
      vicinity: '123 Main St, Downtown',
      price_level: 2,
      photos: [{ photo_reference: 'dummy_photo_1' }]
    },
    {
      place_id: 'dummy2', 
      name: 'Bella Italia',
      rating: 4.7,
      vicinity: '456 Oak Ave, Little Italy',
      price_level: 3,
      photos: [{ photo_reference: 'dummy_photo_2' }]
    },
    {
      place_id: 'dummy3',
      name: 'Sunrise Cafe',
      rating: 4.2,
      vicinity: '789 Pine St, Arts District', 
      price_level: 1,
      photos: [{ photo_reference: 'dummy_photo_3' }]
    },
    {
      place_id: 'dummy4',
      name: 'Dragon Palace',
      rating: 4.6,
      vicinity: '321 Elm St, Chinatown',
      price_level: 2,
      photos: [{ photo_reference: 'dummy_photo_4' }]
    },
    {
      place_id: 'dummy5',
      name: 'Burger Junction',
      rating: 4.1,
      vicinity: '654 Maple Dr, Food Court',
      price_level: 1,
      photos: [{ photo_reference: 'dummy_photo_5' }]
    },
    {
      place_id: 'dummy6',
      name: 'Le Petit Bistro',
      rating: 4.8,
      vicinity: '987 Rose Blvd, French Quarter',
      price_level: 4,
      photos: [{ photo_reference: 'dummy_photo_6' }]
    }
  ]
};

/**
 * GET /api/places
 * 
 * Fetches restaurant data based on latitude and longitude.
 * Currently uses dummy data for testing, but can be switched to Google Places API.
 * 
 * Query Parameters:
 * - lat: Latitude coordinate (float)
 * - lng: Longitude coordinate (float)
 * 
 * Response:
 * - results: Array of restaurant objects with place_id, name, rating, vicinity, price_level, photos
 * 
 * Features:
 * - Dummy data mode for development
 * - Google Places API integration (when enabled)
 * - Automatic fallback to dummy data on API errors
 * - CORS enabled for frontend access
 */
app.get('/api/places', async (req, res) => {
  const { lat, lng } = req.query;
  
  // Toggle this to switch between dummy data and Google Places API
  // Set to false and add GOOGLE_API_KEY to .env to use real data
  const useDummyData = false;
  
  if (useDummyData) {
    console.log('Returning dummy restaurant data for testing');
    res.json(dummyRestaurants);
    return;
  }
  
  // Google Places API integration (requires valid API key)
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        key: GOOGLE_API_KEY,
        location: `${lat},${lng}`,
        radius: 1500,        // Search within 1.5km radius
        type: 'restaurant'   // Only restaurants (removed opennow restriction)
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Google Places API error:', error.message);
    console.log('Falling back to dummy data');
    res.json(dummyRestaurants);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server running on port', PORT));
