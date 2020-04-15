const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const resolvers = require('./resolvers');
const startDatabase = require('./database');
const expressPlayground = require('graphql-playground-middleware-express')
   .default;

// Create a context for holding contextual data
const context = async (req) => {
   const db = await startDatabase();
   const { authorization: token } = req.headers;
   return { db, token };
};

//Provide resolver fucntions for your schema fields

const app = express();
app.use(
   '/graphql',
   graphqlHTTP(async (req) => ({
      schema,
      rootValue: resolvers,
      context: () => context(req),
   })),
);
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
app.listen(4000);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
