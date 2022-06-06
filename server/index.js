const colors = require('colors')
const express = require('express');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db')

const app = express();

// Connect to DB
connectDB();

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: process.env.NODE_ENV === 'development'
    })
);

app.listen(port, console.log(`Server running on port ${port}`));