const express = require('express')

// bring graphql http
const { graphqlHTTP } = require('express-graphql')

// bring colors
const colors = require('colors')
// bring schema
const schema = require('./graphql_schema/schema')

// bring db.js
const connectDB = require('./config/db')

// cors is used to allow cross origin requests
const cors = require('cors')
// .env in root folder
require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

// connect to db
connectDB();

app.use(cors());
// middleware to use graphql
app.use('/graphql', graphqlHTTP({
    schema,
    // true if we are in development mode and false if we are in production mode
    graphiql: process.env.NODE_ENV === 'development' ? true : false
}));
// running
app.listen(port, console.log(`server listening on ${port}`))