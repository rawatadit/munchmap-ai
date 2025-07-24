const axios = require('axios');

async function testAPI() {
  try {
    const response = await axios.get('http://localhost:3001/api/places?lat=37.7749&lng=-122.4194');
    const results = response.data.results || [];
    
    console.log(`📊 API Response Summary:`);
    console.log(`Total restaurants found: ${results.length}`);
    console.log(`Status: ${response.data.status}`);
    
    if (results.length > 0) {
      console.log(`\n🍽️ Sample Restaurants:`);
      results.slice(0, 3).forEach((restaurant, index) => {
        console.log(`\n${index + 1}. ${restaurant.name}`);
        console.log(`   Rating: ${restaurant.rating || 'N/A'} ⭐`);
        console.log(`   Address: ${restaurant.vicinity || 'N/A'}`);
        console.log(`   Price Level: ${restaurant.price_level || 'N/A'}`);
        console.log(`   Place ID: ${restaurant.place_id}`);
        console.log(`   Photos: ${restaurant.photos ? restaurant.photos.length : 0}`);
      });
    }
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
  }
}

testAPI();
