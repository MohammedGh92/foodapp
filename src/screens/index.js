import { AppNavigation } from '../common';

import Home from './home/Home';
import Category from './category/Category';
import Productdetails from './productdetails/Productdetails';
import Products from './products/Products';
import Cart from './cart/Cart';
import MapLocation from "../components/Map";
import Bill from "./bill/Bill";
import Menu from './menu/Menu';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import Orders from './orders/Orders';
import AboutUs from './aboutus/AboutUs';

export default () => {

  AppNavigation.registerScreen('home', Home);
  AppNavigation.registerScreen('category', Category);
  AppNavigation.registerScreen('productdetails', Productdetails);
  AppNavigation.registerScreen('products', Products);
  AppNavigation.registerScreen('cart', Cart);
  AppNavigation.registerScreen("maplocation", MapLocation);
  AppNavigation.registerScreen("bill", Bill);
  AppNavigation.registerScreen('menu', Menu);
  AppNavigation.registerScreen('signin', SignIn);
  AppNavigation.registerScreen('signup', SignUp);
  AppNavigation.registerScreen('orders', Orders);
  AppNavigation.registerScreen('aboutus', AboutUs);

};
