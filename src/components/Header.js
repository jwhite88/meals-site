import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Header() {
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


  return (
    <div>
      <nav className='flex flex-row w-screen justify-between px-2'>
        <div>Logo</div>
        <div>Search</div>
        <div>
          <ul className='flex flex-row'>
            {categories.map((category, idx) => {
              return (
                <li key={idx} className='pr-5'>
                  <Link to={`category/${category}`}>{category}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header