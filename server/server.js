require("dotenv").config();
require("./config/dbConnection");

const express = require('express');
const cors = require('cors'); 
const userRoute = require('./routes/userRoute');

const app = express();
  
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoute);

const port = process.env.PORT || 5000
app.listen(5000, console.log(`Server is listening on port ${port}`));

 
 