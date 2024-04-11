import React, { StrictMode } from 'react';

function Receta(props) {
  const prop = props.props;
  var key = prop.idDrink;
  var srcImg = prop.strDrinkThumb;
  var link = 'cocktailReceta.html?id='+key;
  return (
    <StrictMode>
      <div className='trago' key={key}>
        <a href={link}>
        <img src={srcImg} />
        </a>
        <h3>{prop.strDrink} </h3>
      </div>
    </StrictMode>
  )
}

export default Receta