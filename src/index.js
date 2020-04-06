const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const startDatabase = require('./database');
const expressPlayground = require('graphql-playground-middleware-express')
   .default;

// Create a context for holding contextual data
const context = async () => {
   const db = await startDatabase();

   return { db };
};

//Provide resolver fucntions for your schema fields
const resolvers = {
   events: async (_, context) => {
      const { db } = await context();
      return db
         .collection('events')
         .find()
         .toArray();
   },
   event: async ({ id }, context) => {
      const { db } = await context();
      return db.collection('events').findOne({ id });
   },
   editEvent: async ({ id, title, description }, context) => {
      const { db } = await context();

      return db
         .collection('events')
         .findOneAndUpdate(
            { id },
            { $set: { title, description } },
            { returnOriginal: false },
         )
         .then(resp => resp.value);
   },
   recipes: async (_, context) => {
      const { db } = await context();
      return db
         .collection('recipes')
         .find()
         .toArray();
   },
   recipe: async ({ id }, context) => {
      const { db } = await context();
      return db.collection('recipes').findOne({ id });
   },
   addTagToRecipe: async ({ id, category }, context) => {
      const { db } = await context();
      return db
         .collection('recipes')
         .findOneAndUpdate(
            { id },
            { $addToSet: { categories: { name: category } } },
            { returnOriginal: false },
         )
         .then(resp => resp.value);
   },
};

const app = express();
app.use(
   '/graphql',
   graphqlHTTP({
      schema,
      rootValue: resolvers,
      context,
   }),
);
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
app.listen(4000);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
