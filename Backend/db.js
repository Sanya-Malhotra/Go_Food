const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/gofood";

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURL, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    // Access 'fooddata' collection
    const collection = mongoose.connection.db.collection("fooddata");
    const collection2=mongoose.connection.db.collection("category");

    // Fetch data from the collection using a promise
    const data = await collection.find({}).toArray();
    const data2=await collection2.find({}).toArray();

    if (data.length > 0) {
      // Store fetched data in a global variablef
      global.food_items = data;
      global.food_category=data2;
      // console.log("Fetched data:", global.food_items); // Log fetched data
      // Perform additional operations with 'global.food_items' here if needed
    } else {
      console.log("No data found in the collection.");
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

module.exports = mongoDB;
