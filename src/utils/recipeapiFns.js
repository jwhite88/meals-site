import axios from 'axios'

const recipeSearch = async (searchValue) => {
    const result = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    );
     
    return result.data;
}

const loadMore = (count, setCount, max) => {
  if ((count + 12) % 12 === 0) {
    setCount((previous) => previous + 12);
  } else {
    setCount(max);
  }
};

export {
    recipeSearch,
    loadMore
}