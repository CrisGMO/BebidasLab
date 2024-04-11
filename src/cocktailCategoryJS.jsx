import React, { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Recetas from './Components/Recetas/Recetas'
import Categorias from './Components/Categorias/Categorias';

const rootResultados = ReactDOM.createRoot(document.getElementById('cuadrilla-searchx5'));
const rootCategory = ReactDOM.createRoot(document.getElementById('cuadrilla-menus'));
const cargaDisplay = document.getElementById('pantalla-carga');


const urlCategorias = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

const parametros = new URLSearchParams(window.location.search);
const paramId = parametros.get('c');
console.log(paramId);

const categorias = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
                    .then(response => response.json());
console.log(categorias);

const jsonResponse = await fetch(urlCategorias+paramId)
                    .then(resp => resp.json());

const intervalo = setInterval(() => {
    if (jsonResponse != null) {
        clearInterval(intervalo);
        console.log(jsonResponse);
        rootCategory.render(
            <StrictMode>
                <Categorias props={categorias}/>
                <hr />
                <h2>{paramId}</h2>
            </StrictMode>
        )
        cargaDisplay.style.display = 'none';
        rootResultados.render(
            <StrictMode>
                <Recetas recetas={jsonResponse.drinks}></Recetas>
            </StrictMode>
        )
    }

}, 500);