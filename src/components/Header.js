import React, {useState, useEffect, useRef, useContext, useCallback } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './Header.css'
import HeaderContext from '../utils/showhideheader'
import { recipeSearch } from '../utils/recipeapiFns'

import { categories } from '../utils/categories'

function Header() {
  const categoryHolder = useRef();
  const searchInput = useRef()
  const [search, setSearch] = useState("");
 const [showHeader, setShowHeader, recipeSearchResults, setRecipeSearchResults ] = useContext(HeaderContext)
 const navigate = useNavigate()

  useEffect(() => {
   // categoryHolder.current.style['color'] = 'blue'
    return () => {
      
    };
  }, []);

  useEffect(() => {
    setShowHeader(true)
  }, [showHeader]);

  const handleSearchChange = (evt) => {
    evt.preventDefault()
    setSearch(evt.target.value);
  }

   const handleSubmit = useCallback(
     (evt) => {
       evt.preventDefault();
       console.log(evt.keyCode);
       if (evt.keyCode === 13) {
         console.log("yes 13");
          console.log('from search')
          recipeSearch(search)
          .then((result) => {
            console.log(result.meals);
            setRecipeSearchResults(result.meals);
            navigate(`/searchresults`);
            if (result.meals === null) {
              console.log("No hits");
            }
          })
          .catch((err) => {
            console.log(`An ${err} has occurred`);
          })
         searchInput.current.value=""
       }
     },
     [search]
   );
   ;

  return (
    <div className={`${showHeader ? "bg-image" : ""}`}>
      <nav className="relative flex flex-row w-screen justify-between items-center h-12 px-8 bg bg-slate-100 font-['Comfortaa'] text-lg">
        <div>
          <Link to='/'>Logo</Link>
        </div>
        <div className='pl-48'>
          <input
            ref={searchInput}
            type='text'
            name={search}
            id='search'
            onChange={handleSearchChange}
            onKeyUp={handleSubmit}
            placeholder='Search for Recipes...'
            className='inline-block pl-2'
          />
        </div>
        <div>
          <div>
            <ul className='flex flex-row recipe-menu' ref={categoryHolder}>
              {categories.map((category, idx) => {
                return (
                  <li key={idx} className='pr-5'>
                    <Link to={`category/${category}`}>{category}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      <section>
        {showHeader && (
          <h1 className='tex text-9xl text-slate-200 '>Meals are Great!!</h1>
        )}
      </section>
    </div>
  );
}

export default Header