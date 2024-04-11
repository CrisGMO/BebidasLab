import React, { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'

const urlAPIporID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const urlIngrThumb = 'http://www.thecocktaildb.com/images/ingredients/'
const parametros = new URLSearchParams(window.location.search);
const paramId = parametros.get('id');

const jsonResponse = await fetch(urlAPIporID+paramId)
.then(resp => resp.json());

const intervalo = setInterval(() => {
    if (jsonResponse != null) {
        clearInterval(intervalo);
    }
}, 500);

const absRute = jsonResponse.drinks[0];
console.log(absRute);

const rootNombreBebida = ReactDOM.createRoot(document.getElementById('nombre-bebida'));
rootNombreBebida.render(
    <StrictMode>
        <img className='fondo-bebida' src={absRute.strDrinkThumb}/>
        <h1 className='titulo-bebida'>{absRute.strDrink}</h1>
    </StrictMode>
)

const rootReceta = ReactDOM.createRoot(document.getElementById('receta'));
const ingredientes = [];
definirIngredientes();
rootReceta.render(
    <StrictMode>
        <hr/>
            <div className='detalles-bebida'>
                <img className='imagen-bebida' src={absRute.strDrinkThumb}/>
                <div className='ingr-bebida'>
                    <h3>Categoria: {absRute.strCategory}</h3>
                    <h3>Vaso/Copa: {absRute.strGlass}</h3>
                    <h3>Ingredientes:</h3>
                    {imprimirIngredientes(ingredientes)}
                </div>
                <div className='instr-bebida'>
                    <h3>Instrucciones</h3>
                    <h4>{absRute.strInstructions}</h4>
                </div>
            </div>
        <hr />
    </StrictMode>
)

function definirIngredientes() {
    for (let index = 1; index < 16; index++) {
        var auxIngr = 'strIngredient'+index;
        var auxCant = 'strMeasure'+index;
        if (absRute[auxIngr] != null) {
            var aux = [absRute[auxIngr],absRute[auxCant]];
            ingredientes.push(aux);
        }      
    }
}
function imprimirIngredientes(listIngredientes) {
    var index = 0;
    return (
        listIngredientes.map( ingr => {
            index++;
            var urlImg = urlIngrThumb+ingr[0]+'-Small.png';
            return (
                <StrictMode>
                    <div>
                        <h4>- {ingr[1]} {ingr[0]}</h4><img src={urlImg}/>
                    </div>
                </StrictMode>
            )
        } )
    )
    
}

