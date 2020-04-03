//RESTDataSource class is responsible for fetching data from a REST API

const { RESTDataSource } = require('apollo-datasource-rest');

class RecipeAPI extends RESTDataSource {
   constructor() {
      super();
      this.baseURL = 'https://www.themealdb.com/api/json/v1/1/';
   }

   async getRecipes(recipe = 'curry') {
      const response = await this.get(`search.php?s=${recipe}`);
      return Array.isArray(response)
         ? response.map(recipe => this.recipeReducer(recipe))
         : [];
   }

   async getRecipeById({ recipeId }) {
      const response = await this.get('lookup.php?i=', recipeId);
      return this.recipeReducer(response[0]);
   }

   recipeReducer(recipe) {
      return {
         id: recipe.idMeal,
         name: recipe.strMeal,
         instructions: recipe.strInstructions,
         picture: recipe.strMealThumb,
         tag: {
            name: recipe.strArea,
         },
      };
   }
}

module.exports = RecipeAPI;
