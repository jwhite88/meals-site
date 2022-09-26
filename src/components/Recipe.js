import React, {useState, useEffect, useContext} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import HeaderContext from '../utils/showhideheader';


function Recipe() {
    const params = useParams();
    const [recipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [measure, setMeasure] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [showHeader, setShowHeader] = useContext(HeaderContext);

    let x = true;

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.recipeId}`)
        .then((data) => {
            console.log(data.data.meals)
            const mealData = data.data.meals;
            let num = 1;
            let continueWhileLoop = true;
            console.log(mealData[0][`strIngredient${num}`]);
            setIngredients([]);
            setMeasure([])
            while (mealData[0][`strIngredient${num}`] !== null && continueWhileLoop) {
              let newIng = mealData[0][`strIngredient${num}`];
              let newMea = mealData[0][`strMeasure${num}`];

              if (newIng) { setIngredients((previous) => [...previous, newIng])}
              if (newMea) {setMeasure((previous) => [...previous, newMea])}
              num++
              if (num > 20 ) {
                continueWhileLoop = false;
              }
            }
            setRecipe(data.data.meals);
            setInstructions(data.data.meals[0]['strInstructions'].split("."));
          })
          .catch((err) => { 
            console.log(err)
           })
      return () => {};
    }, [params.recipeId]);

    useEffect(() => {
      setShowHeader(false);
    }, [showHeader]);
  return (
    <div className='container mx-auto'>
      <section>
        <h1 className='text-5xl py-4 capitalize'>
          {recipe.length > 0 && recipe[0].strMeal}
        </h1>
        <div>
          <img
            src={recipe.length > 0 && recipe[0].strMealThumb}
            alt=''
            srcset=''
          />
        </div>
      </section>
      <section>
        <div>
          <h3 className='text-3xl text-sky-800 pt-6 pb-4 mb-3 directions-ingredients border-b max-w-[44rem]'>
            Ingredients
          </h3>
          <ul className='pb-3 pl-2'>
            {Array.isArray(ingredients) &&
              ingredients.length > 0 &&
              ingredients.map((item, idx) => {
                if (item !== null) {
                  return (
                    <li className='pb-1'>
                      <span className='inline-block'>{item}</span>:{" "}
                      <span className='inline-block'>{measure[idx]}</span>
                    </li>
                  );
                } else return "";
              })}
          </ul>
        </div>
        <div>
          <h3 className='text-3xl text-sky-800 pt-6 pb-4 mb-3 directions-ingredients  border-b max-w-[44rem]'>
            Directions
          </h3>
          <ul className='pb-3 pl-2'>
            {Array.isArray(instructions) &&
              instructions.length > 0 &&
              instructions.map((instruction, idx) => {
                let parseInst = instruction.replace("\r\n\r\n", "");
                return (
                  <li className='pb-2 max-w-screen-md' key={idx}>
                    {parseInst}.
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Recipe
