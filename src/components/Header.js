import React, {useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Header.css'
import HeaderContext from '../utils/showhideheader'

const categories = [
  "Beef",
  "Chicken",
  "Pork",
  "Lamb",
  "Seafood",
  "Pasta",
  "Vegetarian",
  "Dessert",
];

function Header() {
  const categoryHolder = useRef()
  const [showHeader, setShowHeader] = useContext(HeaderContext);

  useEffect(() => {
   // categoryHolder.current.style['color'] = 'blue'
    return () => {
      
    };
  }, []);

  useEffect(() => {
    setShowHeader(true)
  }, [showHeader]);

  return (
    <div className={`${showHeader ? "bg-image" : ""}`}> 
      <nav className='relative flex flex-row w-screen justify-between items-center h-12 px-8 bg bg-slate-100 '>
        <div>
          <Link to='/'>Logo</Link>
        </div>
        <div className='pl-48'>Search</div>
        <div>
          <div className=''>
            <ul
              className='flex flex-row recipe-menu'
              ref={categoryHolder}
            >
              {categories.map((category, idx) => {
                return (
                  <li key={idx} className='pr-5'>
                    <Link to={`category/${category}`}>{category}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      <section>
        {showHeader && <h1 className='tex text-9xl text-slate-200 '>Meals are Great!!</h1>}
      </section>
    </div>
  );
}

export default Header