const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
   type Query {
      recipes: [Recipe!]!
      recipe(id: ID!): Recipe!
      hello: String
   }

   type User {
      id: ID!
      username: String!
      savedRecipes: [Recipe]!
   }

   type Recipe {
      id: ID!
      name: String!
      instructions: String!
      picture: String!
      categories: [Tag]!
   }

   type Tag {
      id: ID!
      name: String!
   }

   type Mutation {
      addTagToRecipe(id: Int!, category: String!): Recipe!
   }
`;

const recipes = [
   {
      id: '1',
      name: 'Apple Pie',
      instructions: 'Insert instructions here',
      picture: 'Insert picture here',
      categories: [
         {
            id: '1',
            name: 'Vegetarian',
         },
         {
            id: '2',
            name: 'Dessert',
         },
      ],
   },
   {
      id: '2',
      name: 'Tomato Soup',
      instructions: 'Insert instructions here',
      picture: 'Insert picture here',
      categories: [
         {
            id: '1',
            name: 'Vegetarian',
         },
         {
            id: '3',
            name: 'Soup',
         },
      ],
   },
];

const resolvers = {
   Query: {
      recipes: () => recipes,
      hello: () => 'hi',
      recipe: (obj, { id }, context, info) =>
         recipes.find((recipe) => recipe.id === id),
   },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
   console.log(`🚀  Server ready at ${url}`);
});
