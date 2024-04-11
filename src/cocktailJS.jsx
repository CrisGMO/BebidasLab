import React, { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Recetas from './Components/Recetas/Recetas';
import Categorias from './Components/Categorias/Categorias';

const rootResultados = ReactDOM.createRoot(document.getElementById('cuadrilla-resultados'));
const rootCategorias = ReactDOM.createRoot(document.getElementById('cuadrilla-menus'));
const cargaDisplay = document.getElementById('pantalla-carga');


const datos = [];
const categorias = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
                    .then(response => response.json())

for (let index = 0; index < 9; index++) {
  cargarJSON("https://www.thecocktaildb.com/api/json/v1/1/random.php", index);
}

function cargarJSON(url, index) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar');
      }
      return response.json();
    })
    .then(data => {
      datos[index] = data.drinks[0];
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const intervalo = setInterval(() => {
  if (datos.length == 9) {
    cargaDisplay.style.display = 'none';
    clearInterval(intervalo);
    console.log(datos);
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