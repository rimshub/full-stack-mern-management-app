// creating mongoose schema, mongoose schema is a blueprint for mongoose model
// it is not related to graphql schema

// on top of database layer, we have mongoose layer, the object data maper layer where we can create schema that includes fields for our database collections
// on top of that we have graphql api, where we can create graphql schema that includes fields for our graphql queries and mutations
const mongoose = require('mongoose');

// create schema
const ProjectSchema = new mongoose.Schema({ // takes an object
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'in progress', "completed"],
    },
    clientId: {
        // this is a reference to the client model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // this is the name of the model
    }
});


// export project schema as mongoose model
module.exports = mongoose.model('Project', ProjectSchema);
