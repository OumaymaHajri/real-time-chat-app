const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect( process.env.MONGODB_URI).then(()=>{
  console.log("Db is Connected Successfully");
}).catch((error)=>{
  console.log(`Error ${error.message}`);
})

  