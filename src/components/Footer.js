import React from 'react'
import { Link } from 'react-router-dom'
import {categories} from '../utils/categories'
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";

function Footer() {
  return (
    <div className='bg-orange-800 py-4 mt-36'>
      <section className='flex flex-row justify-between px-48 py-4'>
        <div>
          <h4 className="text-2xl text-center pr-14 font-['Comfortaa']">
            Let's Connect
          </h4>
          <ul className='list-none [&>*]:inline-block [&>*]:pr-12 [&>*]:mt-4 [&>*]:text-3xl [&>*]:text-teal-500'>
            <li>
              <ImFacebook2 className='' />
            </li>
            <li>
              <BsTwitter />
            </li>
            <li>
              <BsInstagram />
            </li>
            <li>
              <BsYoutube />
            </li>
          </ul>
        </div>
        <div>
          <div>
            <h3 className="text-3xl pb-4 text-right">Recipes</h3>
            <ul className="text-2xl text-right font-['Comfortaa']">
              {categories.map((category, idx) => {
                return (
                  <li className='pb-2' key={idx}>
                    <Link to={`category/${category}`}>{category}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer
