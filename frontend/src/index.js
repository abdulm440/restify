import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Feed from './pages/Feed';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import EditRestaurantProfile from './pages/EditRestaurant';
import AddRestaurant from './pages/AddRestaurant'
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
