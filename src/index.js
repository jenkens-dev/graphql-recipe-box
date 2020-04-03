const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

//Provide resolver fucntions for your schema fields
const resolvers = {
   hello: () => 'Hello world!',
};

const app = express();

app.use(
   '/graphql',
   graphqlHTTP({
      schema,
      rootValue: resolvers,
   }),
);

app.listen(4000);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
