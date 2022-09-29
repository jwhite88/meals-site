import React, { useState } from 'react'
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import Recipe from "./components/Recipe";
import HeaderContext from "./utils/showhideheader";
import SearchResults from './components/SearchResults';

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [recipeSearchResults, setRecipeSearchResults ] = useState([])
  return (
    <div className=''>
      <HeaderContext.Provider value={[showHeader, setShowHeader, recipeSearchResults, setRecipeSearchResults ]}>
        <Header />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='category/:categoryId' element={<Category />} />
          <Route path='/:recipeCategory/:recipeId' element={<Recipe />} />
          <Route path='/searchresults' element={<SearchResults />} />
        </Routes>
        <Outlet />
        <Footer />
      </HeaderContext.Provider>
    </div>
  );
}

export default App;
