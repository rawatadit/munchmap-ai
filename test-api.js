/**
 * Google Places API Test Script
 * 
 * This script tests the Google Places API integration to ensure:
 * 1. API key is valid and functional
 * 2. API endpoint responds correctly
 * 3. Response format matches expected structure
 * 4. Error handling works properly
 */

const axios = require('axios');
require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Test coordinates (San Francisco)
const TEST_LAT = 37.7749;
const TEST_LNG = -122.4194;

console.log('🧪 Google Places API Test Suite');
console.log('================================');

async function testAPIKey() {
  console.log('\n1️⃣ Testing API Key Configuration...');
  
  if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'YOUR_API_KEY_HERE') {
    console.log('❌ API Key not configured or using placeholder');
    return false;
  }
  
  console.log(`✅ API Key found: ${GOOGLE_API_KEY.substring(0, 10)}...`);
  return true;
}

async function testBasicAPICall() {
  console.log('\n2️⃣ Testing Basic Places API Call...');
  
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        key: GOOGLE_API_KEY,
        location: `${TEST_LAT},${TEST_LNG}`,
        radius: 1500,
        type: 'restaurant'
      },
      timeout: 10000 // 10 second timeout
    });
    
    console.log(`✅ API Response Status: ${response.status}`);
    console.log(`✅ Response received with ${response.data.results?.length || 0} results`);
    
    if (response.data.error_message) {
      console.log(`❌ API Error: ${response.data.error_message}`);
      return false;
    }
    
    return response.data;
  } catch (error) {
    console.log(`❌ API Call Failed: ${error.message}`);
    if (error.response) {
      console.log(`❌ Response Status: ${error.response.status}`);
      console.log(`❌ Response Data:`, error.response.data);
    }
    return false;
  }
}

async function testAPIPermissions() {
  console.log('\n3️⃣ Testing API Permissions & Quota...');
  
  try {
    // Test with a simple request to check quotas
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        key: GOOGLE_API_KEY,
        location: '37.7749,-122.4194',
        radius: 100,
        type: 'restaurant'
      }
    });
    
    if (response.data.status === 'REQUEST_DENIED') {
      console.log('❌ API Request Denied - Check API key permissions');
      console.log('❌ Make sure Places API is enabled in Google Cloud Console');
      return false;
    }
    
    if (response.data.status === 'OVER_QUERY_LIMIT') {
      console.log('❌ API Quota Exceeded - Check your billing account');
      return false;
    }
    
    console.log(`✅ API Status: ${response.data.status}`);
    return true;
  } catch (error) {
    console.log(`❌ Permission Test Failed: ${error.message}`);
    return false;
  }
}

async function testRestaurantData() {
  console.log('\n4️⃣ Testing Restaurant Data Structure...');
  
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        key: GOOGLE_API_KEY,
        location: `${TEST_LAT},${TEST_LNG}`,
        radius: 1500,
        type: 'restaurant'
      }
    });
    
    if (!response.data.results || response.data.results.length === 0) {
      console.log('⚠️  No restaurant results found - this might be normal depending on location');
      return true;
    }
    
    const firstRestaurant = response.data.results[0];
    console.log(`✅ Sample Restaurant: ${firstRestaurant.name}`);
    console.log(`✅ Rating: ${firstRestaurant.rating || 'N/A'}`);
    console.log(`✅ Address: ${firstRestaurant.vicinity || 'N/A'}`);
    console.log(`✅ Price Level: ${firstRestaurant.price_level || 'N/A'}`);
    console.log(`✅ Photos Available: ${firstRestaurant.photos?.length || 0}`);
    
    return true;
  } catch (error) {
    console.log(`❌ Restaurant Data Test Failed: ${error.message}`);
    return false;
  }
}

async function testBackendIntegration() {
  console.log('\n5️⃣ Testing Backend Server Integration...');
  
  try {
    const response = await axios.get(`http://localhost:3001/api/places?lat=${TEST_LAT}&lng=${TEST_LNG}`, {
      timeout: 10000
    });
    
    console.log(`✅ Backend Response Status: ${response.status}`);
    console.log(`✅ Results Count: ${response.data.results?.length || 0}`);
    
    if (response.data.results && response.data.results.length > 0) {
      const firstResult = response.data.results[0];
      if (firstResult.place_id && firstResult.place_id.startsWith('dummy')) {
        console.log('⚠️  Backend is returning dummy data (API may not be working)');
        return false;
      } else {
        console.log('✅ Backend is returning real Google Places data');
        return true;
      }
    }
    
    return true;
  } catch (error) {
    console.log(`❌ Backend Integration Test Failed: ${error.message}`);
    console.log('❌ Make sure the backend server is running on port 3001');
    return false;
  }
}

async function runAllTests() {
  console.log('Starting comprehensive API tests...\n');
  
  const results = {
    apiKey: await testAPIKey(),
    basicCall: await testBasicAPICall(),
    permissions: await testAPIPermissions(),
    restaurantData: await testRestaurantData(),
    backendIntegration: await testBackendIntegration()
  };
  
  console.log('\n📊 Test Results Summary');
  console.log('========================');
  console.log(`API Key Configuration: ${results.apiKey ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Basic API Call: ${results.basicCall ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`API Permissions: ${results.permissions ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Restaurant Data: ${results.restaurantData ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Backend Integration: ${results.backendIntegration ? '✅ PASS' : '❌ FAIL'}`);
  
  const passCount = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`\n🎯 Overall Result: ${passCount}/${totalTests} tests passed`);
  
  if (passCount === totalTests) {
    console.log('🎉 All tests passed! Google Places API is working correctly.');
  } else {
    console.log('❌ Some tests failed. Check the error messages above for details.');
    
    // Provide troubleshooting tips
    console.log('\n🔧 Troubleshooting Tips:');
    if (!results.apiKey) {
      console.log('- Check your .env file has GOOGLE_API_KEY set');
    }
    if (!results.permissions) {
      console.log('- Ensure Places API is enabled in Google Cloud Console');
      console.log('- Check your API key restrictions and permissions');
      console.log('- Verify billing is set up if you exceed free tier');
    }
    if (!results.backendIntegration) {
      console.log('- Make sure backend server is running: npm start');
      console.log('- Check that useDummyData is set to false in server.js');
    }
  }
  
  return passCount === totalTests;
}

// Run the tests
runAllTests().catch(console.error);
