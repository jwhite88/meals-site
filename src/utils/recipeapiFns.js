import axios from 'axios'

const getRecentRecipes = async () => {
 const results = await axios.get("https://www.themealdb.com/api/json/v2/9973533/latest.php");
 return results;
};

const getRecipeCategories = async (catId) => {
  const results = axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`
  );

  return results;
};

const getRecipe = async (recipeId) => {
  const result = axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  );

  return result;
}

const recipeSearch = async (searchValue) => {
    const result = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    );
     
    return result.data;
}

const loadMore = (count, incrementCount, setCount, max) => {
  if ((count + incrementCount) % incrementCount === 0) {
    setCount((previous) => previous + incrementCount);
  } else {
    setCount(max);
  }
};

export {
  getRecentRecipes,
  getRecipeCategories,
  getRecipe,
  recipeSearch,
  loadMore,
}