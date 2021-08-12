import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes' /* Rotas 2/6 - importo o arquivo routes.js */


/* Rotas 3/6 - 
Dentro do reactDOM.render, onde eu tenho meu <Routes />, havia o nome do componente que estaria sendo renderizado na tela, exemplo <Home />
Quando a gente termina de montar as páginas e os componentes do front end, a gente começa a etapa de criar as rotas.
E quando essa etapa chega, a gente apaga todos os componentes que ficam aqui dentro da tag de renderização, e a gente coloca pra renderizar o componente Routes
*/
ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);