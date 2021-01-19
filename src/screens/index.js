import { AppNavigation } from '../common';

import Home from './home/Home';
import Category from './category/Category';
import Recipe from './recipe/Recipe';
import Menu from './menu/Menu';
import AboutUs from './aboutus/AboutUs';
import Ingredients from './ingredients/Ingredients';
import RecipesByIngredients from './RecipesByIngredients/RecipesByIngredients';
import Search from './Search/Search';
import Recipes from './recipes/Recipes';

export default () => {

  AppNavigation.registerScreen('home', Home);
  AppNavigation.registerScreen('category', Category);
  AppNavigation.registerScreen('recipe', Recipe);
  AppNavigation.registerScreen('menu', Menu);
  AppNavigation.registerScreen('aboutus', AboutUs);
  AppNavigation.registerScreen('ingredients', Ingredients);
  AppNavigation.registerScreen('RecipesByIngredients', RecipesByIngredients);
  AppNavigation.registerScreen('Search', Search);
  AppNavigation.registerScreen('recipes', Recipes);

};
