import React, { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Recetas from './Components/Recetas/Recetas';
import Categorias from './Components/Categorias/Categorias';

// URLS API
const urlRandom = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const urlCategorias = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
const urlFiltroCategorias = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const urlRecetaByID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const urlIngrThumb = 'http://www.thecocktaildb.com/images/ingredients/'
// DOM Elements
const rootCategorias = ReactDOM.createRoot(document.getElementById('categorias'));
const rootReceta = ReactDOM.createRoot(document.getElementById('receta'));
const rootResultados = ReactDOM.createRoot(document.getElementById('resultados'));
const cargaDisplay = document.getElementById('pantalla-carga');
// URL parametros
const parametros = new URLSearchParams(window.location.search);
const paramId = parametros.get('id');
const paramCat = parametros.get('cat');
console.log(paramId, paramCat);
// Variables
var datos;
var categorias;
var receta;
var cantRandom = paramId!=null ? 5 : 9;

// Cargar JSON Categorias y Renderizar
recibeJSON(urlCategorias, 1)
  .then(data => {
    rootCategorias.render(
      <StrictMode>
        <Categorias props={data}/>
      </StrictMode>
    )
  })
  .catch(error =>{
    console.error('Error al recibir JSON:', error);
  })

// Cargar JSON Random y Renderizar
if (paramCat==null) {
  recibeJSON(urlRandom, cantRandom)
  .then(data => {
    datos = reordenarArrayRandom(data);
    cargaDisplay.style.display = 'none';
    rootResultados.render(
      <StrictMode>
        <Recetas recetas={datos} />
      </StrictMode>
    )
  })
  .catch(error => {
    console.error('Error al recibir JSON:', error);
  });
}

// Cargar JSON Receta y Renderizar
if (paramId!=null) {
  document.getElementById('resultados').className = 'cuadrilla-randomInfinite';
  recibeJSON(urlRecetaByID+paramId,1)
    .then (data => {
      let receta = data.drinks[0];
      const ingredientes = definirIngredientes(receta);
      rootReceta.render(
        <StrictMode>
            <img className='fondo-bebida' src={receta.strDrinkThumb}/>
            <h1 className='titulo-bebida'>{receta.strDrink}</h1>
            <hr/>
                <div className='detalles-bebida'>
                    <img className='imagen-bebida' src={receta.strDrinkThumb}/>
                    <div className='ingr-bebida'>
                        <h3>Categoria: {receta.strCategory}</h3>
                        <h3>Vaso/Copa: {receta.strGlass}</h3>
                        <h3>Ingredientes:</h3>
                        {imprimirIngredientes(ingredientes)}
                    </div>
                    <div className='instr-bebida'>
                        <h3>Instrucciones</h3>
                        <h4>{receta.strInstructions}</h4>
                    </div>
                </div>
            <hr />
        </StrictMode>
    )
    })
}

if (paramCat!=null) {
  recibeJSON(urlFiltroCategorias+paramCat,1)
    .then (data => {
      cargaDisplay.style.display = 'none';
      document.getElementById('resultados').className = 'cuadrilla-searchx5';
      rootReceta.render(<h2>{paramCat}</h2>);
      rootResultados.render(
        <StrictMode>
            <Recetas recetas={data.drinks}></Recetas>
        </StrictMode>
    );
    })
}

// Funciones
async function recibeJSON(url, cantidad) {
  const data = [];

  for (let index = 0; index < cantidad; index++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        data.push(json);
      }
      else {
        throw new Error('Error en fetch:', url)
      }
    } catch (error) {
      console.error('Error:', error.message)
    }    
  }
  if (cantidad==1) {
    return data[0];
  }
  return data;
}

function reordenarArrayRandom(array) {
  const nuevoArray = [];
  array.map( elemento => nuevoArray.push(elemento.drinks[0]))
  return nuevoArray;
}

function definirIngredientes(receta){
  let arrayAux = [];
  for (let index = 1; index < 16; index++) {
      var auxIngr = 'strIngredient'+index;
      var auxCant = 'strMeasure'+index;
      if (receta[auxIngr] != null) {
          var aux = [receta[auxIngr],receta[auxCant]];
          arrayAux.push(aux);
      }      
  }
  return arrayAux;
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