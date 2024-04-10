require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name:{
      type: String,
      Required: true
  },
  age: Number,
  favoriteFoods: [String]
})


let Person = new mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var man = new Person({
    name: 'jeff',
    age: 30,
    favoriteFoods: ['brownies', 'donuts']
  })
  man.save(function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
  // Person.create({name: 'jim', age: 30, favoriteFoods: ['spaghetti']}, function(err, data) {
  //   if (err) return done(err);
  //   done(null, data);
  //  });
  
};
var arrayOfPeople = [
  {name:'John doe'}, 
  {name:'smith'}, 
  {name:'Francine'}]
const createManyPeople = (arrayOfPeople, done) => {
  
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName},function(err, data) {
    if (err) console.log(err);
    done(null, data);
  } );
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save(function(err, updatedperson){
      if (err) console.log(err);
      done(null, updatedperson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, person){
    if (err) console.log(err);
    done(null, person)
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, db){
    if (err) console.log(err);
    done(null, db);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data){
    if (err) console.log(err);
    done(null , data);
  });
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, data){
    if (err) console.log(err);
    done(null , data);
  });
  
};

/** **Well Done !!**
 /* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
