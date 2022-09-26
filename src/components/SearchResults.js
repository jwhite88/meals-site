import React, { useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import HeaderContext from '../utils/showhideheader'
import { loadMore } from '../utils/recipeapiFns';

export default function SearchResults() {
    const [count, setCount] = useState(10);
    const [max, setMax] = useState(0);
    const [showHeader, setShowHeader, recipeSearchResults, setRecipeSearchResults ] = useContext(HeaderContext)
  return (
    <div>
      <section className='container mx-auto'>
        <h1 className='directions-ingredients text-2xl py-4'>
          {/* {params.categoryId} Recipes */}
        </h1>
        <div className='flex flex-row flex-wrap justify-around gap-8'>
          {Array.isArray(recipeSearchResults) &&
            recipeSearchResults.slice(0, count).map((recipe) => {
              return (
                <div key={recipe.idMeal}>
                  <h3 className='pb-1 text-lg pl-2 capitalize'>
                    {recipe.strMeal.substring(0, 25)}
                    {recipe.strMeal.length > 25 ? "..." : ""}
                  </h3>
                  <img
                    className='w-[250px] block rounded-md'
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                  />
                  {/* {recipe.idMeal} */}
                  <Link to={`/${recipeSearchResults.strCategory}/${recipeSearchResults.idMeal}`}>
                    <span className='inline-block mt-2 pt-02 border border-2 border-emerald-800 min-w-[5rem] rounded-md text-center'>
                      Recipe
                    </span>
                  </Link>
                </div>
              );
            })}
        </div>
        {count < max && (
          <button
            className='block border-solid border-[1.75px] border-teal-800 rounded-md min-w-[8rem] mt-4 text-xl'
            onClick={() => loadMore(count, setCount, max)}
          >
            Load More
          </button>
        )}
      </section>
    </div>
  );
}
