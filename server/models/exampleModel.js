const mongoose = require('mongoose');

const MONGO_URI = 'ADD URI HERE';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'SET DATABASE NAME HERE',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// SCHEMA TEMPLATE
const exampleSchema = new Schema({});

// MODEL TEMPLATE -  creates model for collection that will be part of export
const exampleModel = mongoose.model('species', speciesSchema);

// exports all the models in an object to be used in the controller
module.exports = {
  exampleModel,
};
