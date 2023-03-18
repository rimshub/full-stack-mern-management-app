// creating mongoose schema, mongoose schema is a blueprint for mongoose model
// it is not related to graphql schema

// on top of database layer, we have mongoose layer, the object data maper layer where we can create schema that includes fields for our database collections
// on top of that we have graphql api, where we can create graphql schema that includes fields for our graphql queries and mutations
const mongoose = require('mongoose');

// create schema: takes an object, where we define the fields for our collection
const ClientSchema = new mongoose.Schema({ // takes an object
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});


// export client schema as mongoose model
module.exports = mongoose.model('Client', ClientSchema); // export as a model
