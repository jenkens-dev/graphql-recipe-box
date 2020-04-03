const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

let database = null;

async function startDatabase() {
   const mongo = new MongoMemoryServer();
   const mongoDBURL = await mongo.getConnectionString();
   const connection = await MongoClient.connect(mongoDBURL, {
      useNewUrlParser: true,
   });

   if (!database) {
      database = connection.db();
      await database.collection('recipes').insertMany([
         {
            id: 1,
            name: 'Apple Pie',
            instructions: 'Insert instructions here',
            picture: 'Insert picture here',
            categories: [
               {
                  id: 1,
                  name: 'Vegetarian',
               },
               {
                  id: 2,
                  name: 'Dessert',
               },
            ],
         },
         {
            id: 2,
            name: 'Tomato Soup',
            instructions: 'Insert instructions here',
            picture: 'Insert picture here',
            categories: [
               {
                  id: 1,
                  name: 'Vegetarian',
               },
               {
                  id: 3,
                  name: 'Soup',
               },
            ],
         },
      ]);
   }

   return database;
}

module.exports = startDatabase;
