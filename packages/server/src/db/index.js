const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

exports.Connect = async () => {
  mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    auth: {
      username: 'root',
      password: 'password'
    }
  });
}

exports.Quiz = require("./schema").Quiz;
