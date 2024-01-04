import React from 'react'
import '../styles/cat.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function CatCard({cat_fact, index}) {

  return (
    <Link to={`/cat_fact/${index}`} key={index} className="cat_card">
      <img src={cat_fact.img} id="catImage" alt="Cat Image"/>
      <div className="preview">{cat_fact.fact}</div>
      <div className="length">({cat_fact.length} chars)</div>
    </Link>
  );
}

export default CatCard;
