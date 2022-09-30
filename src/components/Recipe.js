import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getRecipe } from "../utils/recipeapiFns";
import HeaderContext from "../utils/showhideheader";
import { GiSpoon } from "react-icons/gi";
import { IoCaretBackSharp } from "react-icons/io5";

function Recipe() {
  const params = useParams();
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [, setShowHeader] = useContext(HeaderContext);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    console.log({ location });
    getRecipe(params.recipeId)
      .then((data) => {
        console.log(data.data.meals);
        const mealData = data.data.meals;
        let num = 1;
        let continueWhileLoop = true;
        console.log(mealData[0][`strIngredient${num}`]);
        setIngredients([]);
        setMeasure([]);
        while (
          mealData[0][`strIngredient${num}`] !== null &&
          continueWhileLoop
        ) {
          let newIng = mealData[0][`strIngredient${num}`];
          let newMea = mealData[0][`strMeasure${num}`];

          if (newIng) {
            setIngredients((previous) => [...previous, newIng]);
          }
          if (newMea) {
            setMeasure((previous) => [...previous, newMea]);
          }
          num++;
          if (num > 20) {
            continueWhileLoop = false;
          }
        }
        setRecipe(data.data.meals);
        setInstructions(data.data.meals[0]["strInstructions"].split("."));
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, [params.recipeId]);

  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);

  const backToTop = (evt) => {
    window.history.back();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto pl-32">
      <section>
        <h1 className="text-5xl py-6 font-['Comfortaa'] capitalize text-darkgreen-800 ">
          {recipe.length > 0 && recipe[0].strMeal}
        </h1>
        <div>
          <img
            className="rounded-[60px]"
            src={recipe.length > 0 ? recipe[0].strMealThumb : ""}
            alt={recipe.length > 0 ? recipe[0].strMeal : ""}
          />
        </div>
      </section>
      <section>
        <div>
          <h3 className="text-3xl text-darkgreen-800  pt-10 pb-4 mb-3 directions-ingredients border-b max-w-[44rem]">
            Ingredients
          </h3>
          <ul className="pb-3 pl-2 font-['Comfortaa'] text-[1.25rem]">
            {Array.isArray(ingredients) &&
              ingredients.length > 0 &&
              ingredients.map((item, idx) => {
                if (item !== null) {
                  return (
                    <li key={idx} className="pb-4">
                      <GiSpoon className="inline-block pr-2 mb-3 text-[2rem]" />
                      <span className="inline-block">{item}</span>:{" "}
                      <span className="inline-block">{measure[idx]}</span>
                    </li>
                  );
                } else return "";
              })}
          </ul>
        </div>
        <div>
          <h3 className="text-3xl text-darkgreen-800  pt-6 pb-4 mb-3 directions-ingredients  border-b max-w-[44rem]">
            Directions
          </h3>
          <ul className="pb-3 pl-2 font-['Comfortaa'] text-[1.25rem]">
            {Array.isArray(instructions) &&
              instructions.length > 0 &&
              instructions.map((instruction, idx) => {
                let parseInst = instruction.replace("\r\n\r\n", "");
                if (parseInst === "") {
                  return true;
                }
                return (
                  <li className="pb-4 max-w-screen-md" key={idx}>
                    <span className="bol font-bold inline-block pr-0 mr-2 text-darkgreen-800 ">
                      {idx + 1}.{" "}
                    </span>
                    {parseInst}.
                  </li>
                );
              })}
          </ul>
        </div>
        <button onClick={backToTop}>
          {/* <IoCaretBackSharp className="inline-block pr-2 mb-3 text-[2rem] text-darkgreen-100" /> */}
          <span className="text-[1.25rem] bg-darkgreen-700 hover:bg-darkgreen-200 text-white-900 border-[2px] border-solid rounded-[5px] px-4 inline-block">
            Back
          </span>
        </button>
      </section>
    </div>
  );
}

export default Recipe;
// window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
