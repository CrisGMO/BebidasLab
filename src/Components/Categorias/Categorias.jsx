import React from 'react'

function Categorias(props) {
    var categorias = props.props.drinks;
  return (
    categorias.map( (categoria) => {
        var urlAPICategoria = "cocktailCategory.html?c="+categoria.strCategory;
        return (
        <a href={urlAPICategoria}>{categoria.strCategory}</a>
        )
    })
  )
}

export default Categorias