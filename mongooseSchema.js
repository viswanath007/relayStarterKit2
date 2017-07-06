const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const config = require('../../config/database');

const PersonSchema = mongoose.Schema({
  id: {
    type: String
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  ip_address: {
    type: String,
  }
});

PersonSchema.set('toJSON', {getters: true});

// export const Person  = mongoose.model('Person', PersonSchema, 'persons');
let Person = mongoose.model('Person', PersonSchema);

exports.PersonSchema = User;

mongoose.connect('mongodb://localhost:27017/rgrjs');

//Get the default connection
var db1 = mongoose.connection;

var database = {};
//Bind connection to error event (to get notification of connection errors)
db1.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Person.find({}).exec(function(err, result) {
//      if (!err) {
//       //  console.log(result);
//        database = result;
//      } else {
//        console.log(err);
//      };
// })
// export const getDB = database;
exports.getListOfPersons = () => {
  return new Promise((resolve, reject) => {
    User.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};


module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};


const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});


const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username};
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
};
