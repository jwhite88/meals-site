import React, {useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

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

  useEffect(() => {
   // categoryHolder.current.style['color'] = 'blue'
    return () => {
      
    };
  }, []);

// hover:[&>ul]:opacity-100 

// const handleMouseEnter = (evt) => {
//   //evt.target.stopPropagation();
//   console.log(evt.target.nextSibling);
//   if (evt.target.nextSibling.classList.contains('recipe-menu')) {
//     evt.target.nextSibling.classList.remove('recipe-menu')
//   } else {
//     // evt.target.nextSibling.classList.add('recipe-menu')
//   }
// }

// const handleMouseLeave = (evt) => {
//   //evt.target.stopPropagation();
//   console.log(evt.target);
//   if (!categoryHolder.current.classList.contains("recipe-menu")) {
//      categoryHolder.current.classList.add("recipe-menu");
//   } else {
//     // evt.target.nextSibling.classList.add('recipe-menu')
//   }
// };

  return (
    <div>
      <nav className='flex flex-row w-screen justify-between px-8'>
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
    </div>
  );
}

export default Header