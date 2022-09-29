import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getRecentRecipes } from "../utils/recipeapiFns";
import HeaderContext from '../utils/showhideheader';

function Home() {
  const [recentMeals, setRecentMeals] = useState([]);
  const [, setShowHeader] = useContext(HeaderContext);
  useEffect(() => {
    getRecentRecipes()
    .then((recent) => {
      console.log(recent.data.meals); 
      setRecentMeals(recent.data.meals)
    })
    return () => {
      
    };
  }, []);

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);
  return (
    <div>
      <section>
        <h2 className="font-['Merienda'] text-center text-4xl py-8">
          Recent Recipes
        </h2>
        <div className='px-16'>
          <section className='flex flex-row flex-wrap justify-around'>
            {Array.isArray(recentMeals) &&
              recentMeals.map((recipe) => {
                return (
                  <div key={recipe.idMeal} className='mb-8 mr-5'>
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
                    <Link to={`/${recipe.strCategory}/${recipe.idMeal}`}>
                      <span className='inline-block mt-2 pt-02 border border-2 border-emerald-800 min-w-[5rem] rounded-md text-center'>
                        Recipe
                      </span>
                    </Link>
                  </div>
                );
              })}
          </section>
        </div>
      </section>
    </div>
  );
}

export default Home