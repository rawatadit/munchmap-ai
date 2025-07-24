const axios = require('axios');

function getTimeFilter() {
  const hour = new Date().getHours();
  if (hour < 11) return 'breakfast';
  if (hour < 16) return 'lunch';
  return 'dinner';
}

async function debugFilters() {
  try {
    console.log('🕒 Current time:', new Date().toLocaleTimeString());
    const filter = getTimeFilter();
    console.log('📅 Time filter:', filter);

    const response = await axios.get('http://localhost:3001/api/places?lat=37.7749&lng=-122.4194');
    const originalItems = response.data.results || [];
    console.log(`📊 Original restaurants from API: ${originalItems.length}`);

    // Apply time-based filtering
    let filteredItems = originalItems.filter(r => {
      const name = r.name.toLowerCase();
      if (filter === 'breakfast') return name.includes('breakfast') || name.includes('cafe');
      if (filter === 'lunch') return name.includes('lunch') || name.includes('cafe') || name.includes('deli');
      return name.includes('dinner') || true; // Show all for dinner
    });
    console.log(`🍽️ After time filtering: ${filteredItems.length}`);

    // Apply rating filtering
    filteredItems = filteredItems.filter(r => r.rating >= 4);
    console.log(`⭐ After rating filtering (4+ stars): ${filteredItems.length}`);

    // Show rating distribution
    const ratings = originalItems.map(r => r.rating).filter(r => r);
    const ratingCounts = {};
    ratings.forEach(r => {
      const rounded = Math.floor(r);
      ratingCounts[rounded] = (ratingCounts[rounded] || 0) + 1;
    });
    console.log('📈 Rating distribution:', ratingCounts);

    if (filteredItems.length === 0) {
      console.log('\n❌ NO RESTAURANTS PASS FILTERS!');
      console.log('🔧 Possible solutions:');
      console.log('1. Lower rating threshold from 4.0 to 3.5');
      console.log('2. Remove time-based filtering');
      console.log('3. Show all restaurants regardless of filters');
      
      console.log('\n📝 Sample restaurants that were filtered out:');
      originalItems.slice(0, 3).forEach((r, i) => {
        console.log(`${i+1}. ${r.name} - Rating: ${r.rating} ⭐`);
      });
    } else {
      console.log('\n✅ Sample restaurants that passed filters:');
      filteredItems.slice(0, 3).forEach((r, i) => {
        console.log(`${i+1}. ${r.name} - Rating: ${r.rating} ⭐`);
      });
    }

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugFilters();
