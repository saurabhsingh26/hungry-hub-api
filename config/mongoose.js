const mongoose = require('mongoose');
mongoose.connect(process.env.HUNGRYHUB);
mongoose.set("strictQuery", true);
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in connection db"));

db.once('open',function(){
    console.log("Successfully connected to database :: MongoDB");  
})