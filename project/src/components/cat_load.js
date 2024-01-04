import React from 'react'
import loading_cat from '../styles/gifs/loading_cat.gif'
import '../styles/cat.css'

function CatLoad() {
  return (
    <div className='loading'>
      <div>
        <img className='gif' src={loading_cat} alt="Loading..." />
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default CatLoad;
