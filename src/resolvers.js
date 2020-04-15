const isTokenValid = require('./validate');

const resolvers = {
   events: async (_, context) => {
      const { db, token } = await context();
      const { error } = await isTokenValid(token);
      const events = db.collection('events').find();
      return !error
         ? events.toArray()
         : events.project({ attendants: null }).toArray();
   },
   event: async ({ id }, context) => {
      const { db, token } = await context();
      const { error } = await isTokenValid(token);
      const event = await db.collection('events').findOne({ id });
      return !error ? event : { ...event, attendants: null };
   },
   editEvent: async ({ id, title, description }, context) => {
      const { db, token } = await context();

      const { error } = await isTokenValid(token);

      if (error) {
         throw new Error(error);
      }

      return db
         .collection('events')
         .findOneAndUpdate(
            { id },
            { $set: { title, description } },
            { returnOriginal: false },
         )
         .then((resp) => resp.value);
   },
   recipes: async (_, context) => {
      const { db } = await context();
      return db.collection('recipes').find().toArray();
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
         .then((resp) => resp.value);
   },
};

module.exports = resolvers;
