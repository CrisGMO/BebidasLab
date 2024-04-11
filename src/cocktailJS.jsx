import React, { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Recetas from './Components/Recetas/Recetas';
import Categorias from './Components/Categorias/Categorias';

const rootResultados = ReactDOM.createRoot(document.getElementById('cuadrilla-resultados'));
const rootCategorias = ReactDOM.createRoot(document.getElementById('cuadrilla-menus'));
const cargaDisplay = document.getElementById('pantalla-carga');

const urlRandom = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const urlCategorias = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

var datos;
var categorias;

recibeJSON(urlRandom, 9)
  .then(data => {
    datos = reordenarArrayRandom(data);
  })
  .catch(error => {
    console.error('Error al recibir JSON:', error);
  });

recibeJSON(urlCategorias, 1)
  .then(data => {
    categorias = data[0];
  })
  .catch(error =>{
    console.error('Error al recibir JSON:', error);
  })

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
  return data;
}

function reordenarArrayRandom(array) {
  const nuevoArray = [];
  array.map( elemento => nuevoArray.push(elemento.drinks[0]))
  return nuevoArray;
}

const intervalo = setInterval(() => {
  if (datos.length == 9) {
    cargaDisplay.style.display = 'none';
    clearInterval(intervalo);
    console.log(categorias);
    rootResultados.render(
      <StrictMode>
        <Recetas recetas={datos} />
      </StrictMode>
    )
    rootCategorias.render(
      <StrictMode>
        <Categorias props={categorias}/>
      </StrictMode>
    )
  }
}, 500);