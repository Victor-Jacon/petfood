import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes' /* Rotas 2/6 - importo o arquivo routes.js */

/* REDUX 8
Importo o provider, que vai prover o estado REDUX para minha aplicação
Importo a store, que é a store do redux onde estão salvos os estados, ela será usada como props para o provider.
*/
import { Provider } from 'react-redux' 
import store from './store'


/* Rotas 3/6 - 
Dentro do reactDOM.render, onde eu tenho meu <Routes />, havia o nome do componente que estaria sendo renderizado na tela, exemplo <Home />
Quando a gente termina de montar as páginas e os componentes do front end, a gente começa a etapa de criar as rotas.
E quando essa etapa chega, a gente apaga todos os componentes que ficam aqui dentro da tag de renderização, e a gente coloca pra renderizar o componente Routes
*/

/* REDUX 9
O react joga dados de cima pra baixo, então a gente coloca as chaves do Provider que acabamos de importar, pra prover o estado para a aplicação 

*/
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);