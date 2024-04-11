import React from 'react'
import Receta from '../Receta/Receta'

function Recetas (recetas) {
    // console.log(recetas);
    var lista = recetas.recetas;
    return (
            lista.map( (receta) => {
                return (
                    <Receta props={receta}></Receta>
                )
            })
    )
}

export default Recetas