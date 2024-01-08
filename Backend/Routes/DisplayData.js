// Assuming mongoDB function retrieves data and assigns it to global.food_items

// Example of how mongoDB function sets global.food_items after fetching data
const mongoDB = async () => {
    try {
      // MongoDB connection and data fetching process
      // ...
  
      // After fetching data, set global.food_items
      global.food_items = fetchedData; // Replace fetchedData with the actual fetched data
    } catch (err) {
      console.error("Error fetching data from MongoDB:", err);
      throw err;
    }
  };
  
  // Set up your Express route
  const express = require('express');
  const router = express.Router();
  
  // POST request handler for /foodData route
  router.post('/foodData', (req, res) => {
    try {
      // Log and send global.food_items
    res.send([global.food_items,global.food_category])
    } catch (error) {
      console.error(error.message);
      res.status(500).send(); // Send a 500 internal server error response
    }
  });
  
  module.exports = router;
  