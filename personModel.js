let mongoose = require('mongoose');


let personSchema = new mongoose.Schema({
    name:{
        type: String,
        Required: true
    },
    age: Number,
    favoriteFoods: [String]
  })
  
module.exports = mongoose.model('Person', personSchema);
