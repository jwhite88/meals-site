import axios from 'axios'

const recipeSearch = async (searchValue) => {
    const result = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    );
     
    return result.data;
}

export {
    recipeSearch
}