import React from 'react'
import { Link } from 'react-router-dom'
import {categories} from '../utils/categories'
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";

function Footer() {
  return (
    <div className='bg-orange-800 py-4 mt-12'>
      <section className='flex flex-row justify-between px-32'>
        <div>
          <h4>Let's Connect</h4>
          <ul className='ul list-none [&>*]:inline-block [&>*]:pr-5 [&>*]:mt-4 [&>*]:text-3xl [&>*]:text-teal-500'>
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
          <ul>
            {categories.map((category, idx) => {
              return (
                <li key={idx}>
                  <Link to={`category/${category}`}>{category}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Footer
