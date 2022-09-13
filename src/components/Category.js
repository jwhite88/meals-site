import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Category() {
    const params = useParams()
    const [recipes, setRecipes] = useState([]);
    const [count, setCount] = useState(10);
    const [max, setMax] = useState(0);

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.categoryId}`)
        .then((meals) => {  
            console.log(meals.data.meals)
            setCount(10);
            setMax(meals.data.meals.length)
            setRecipes(meals.data.meals);
        })
        return () => {
            
        };
    }, [params.categoryId]);

    const loadMore = () => {
        if ((count + 10) % 10 === 0 ) {
            setCount((previous) => previous + 10);
        } else {
            setCount(max)
        }
        
      }
  return (
    <div>
      <section>
        <h1>Category</h1>
        <div>
          {Array.isArray(recipes) &&
            recipes.slice(0, count).map((recipe) => {
              return (
                <div>
                  {recipe.strMeal}
                  ID: {recipe.idMeal}
                </div>
              );
            })}
        </div>
      </section>
      {count < max && <button onClick={loadMore}>Load More</button>}
    </div>
  );
}

export default Category
