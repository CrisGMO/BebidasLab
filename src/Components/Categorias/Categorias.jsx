import React from 'react'

function Categorias(props) {
    var categorias = props.props.drinks;
    var index = 0;
  return (
    categorias.map( (categoria) => {
        var urlAPICategoria = "/index.html?cat="+categoria.strCategory;
        index++;
        return (
        <a key={index} href={urlAPICategoria}>{categoria.strCategory}</a>
        )
    })
  )
}

export default Categorias