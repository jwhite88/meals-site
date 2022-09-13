import React, {useState} from 'react'
import { useParams, useParms } from 'react-router-dom'

function Recipe() {
    const recipedId = useParams("recipedId");
  return (
    <div>
      <section>
        <h1>Title</h1>
        <div>
          <img src='' alt='' srcset='' />
        </div>
      </section>
      <section>
        <div>
          <h3>Ingredients</h3>
          <ul></ul>
        </div>
        <div>
          <h3>Directions</h3>
          <ul></ul>
        </div>
      </section>
    </div>
  );
}

export default Recipe