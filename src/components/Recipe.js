import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function Recipe() {
    const params = useParams();
    const [recipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [measure, setMeasure] = useState([]);
    const [instructions, setInstructions] = useState([]);

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
  return (
    <div>
      <section>
        <h1>{recipe.length > 0 && recipe[0].strMeal}</h1>
        <div>
          <img src={recipe.length > 0 && recipe[0].strMealThumb} alt='' srcset='' />
        </div>
      </section>
      <section>
        <div>
          <h3 className='pb-2'>Ingredients</h3>
          <ul>
            {Array.isArray(ingredients) &&
              ingredients.length > 0 &&
              ingredients.map((item, idx) => {
                if (item !== null) {
                  return (
                    <li>
                      {item} and {measure[idx]}
                    </li>
                  );
                } else return "";
              })}
          </ul>
        </div>
        <div>
          <h3 className='py-2'>Directions</h3>
          <ul>
            {Array.isArray(instructions) && instructions.length > 0 && instructions.map((instruction, idx) => { 
                let parseInst = instruction.replace("\r\n\r\n", "");
                return (
                    <li key={idx}>{parseInst}.</li>
                )
             })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Recipe
