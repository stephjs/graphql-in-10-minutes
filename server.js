const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { queries: query } = require('./schema/queries.js');
const { mutations: mutation } = require('./schema/mutations.js');

const app = express();
const port = 5000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema: new GraphQLSchema({ query, mutation }),
    graphiql: true,
  })
);

app.listen(port, () => console.log(`running on ${port}`));
