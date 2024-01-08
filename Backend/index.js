const express = require('express');
const app = express();
const port = 4000;
const mongoDB = require('./db');
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
  );
  next();
})
mongoDB().then(() => {
  app.get('/', (req, res) => {
    res.send('Hello World');
  });
  app.use(express.json())
  app.use('/api',require("./Routes/CreateUser"))
   app.use('/api',require("./Routes/DisplayData"))
   app.use('/api',require("./Routes/OrderData"))
  app.listen(port, () => {
    console.log(`Running on ${port}`);
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
