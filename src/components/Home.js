import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import HeaderContext from '../utils/showhideheader';

function Home() {
  const [recentMeals, setRecentMeals] = useState([]);
  const [showHeader, setShowHeader] = useContext(HeaderContext);
  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v2/9973533/latest.php")
    .then((recent) => {
      console.log(recent.data.meals); 
      setRecentMeals(recent.data.meals)
    })
    return () => {
      
    };
  }, []);

  useEffect(() => {
    setShowHeader(true)
  }, []);
  return (
    <div>
      <section>
        <h2 className='text-center f text-4xl py-8'>Recent Recipes</h2>
        <div className='px-16'>
          <section className='flex flex-row justify-around'>
            <div className=''>
              <div className="img-meal"><img src="" alt="" /></div>
              <h3>Title</h3>
              <div className="meal-description">
                <p></p>
              </div>
            1</div>
            <div className=''>
              <div className="img-meal"><img src="" alt="" /></div>
              <h3>Title</h3>
              <div className="meal-description">
                <p></p>
              </div>
            2</div>
            <div className=''>
              <div className="img-meal"><img src="" alt="" /></div>
              <h3>Title</h3>
              <div className="meal-description">
                <p></p>
              </div>
            3</div>
            <div className=''>
              <div className="img-meal"><img src="" alt="" /></div>
              <h3>Title</h3>
              <div className="meal-description">
                <p></p>
              </div>
            4</div>
          </section>
        </div>
      </section>
    </div>
  )
}

export default Home