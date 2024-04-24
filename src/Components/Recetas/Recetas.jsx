import React from 'react'
import Receta from '../Receta/Receta'

function Recetas (recetas) {
    var lista = recetas.recetas;
    return (
            lista.map( (receta) => {
                return (
                    <Receta key={receta.idDrink} props={receta}></Receta>
                )
            })
    )
}

export default Recetas