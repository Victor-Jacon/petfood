/* REDUX 6 
Criamos o index.js dentro de store
Ele será responsável por dar o bootstrap, levantar o ambiente de configuração do redux na nossa aplicação.
Importamos o createStore, que o nome já diz, é a store que vai conter os states
*/

import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

/* REDUX 7
O primeiro parâmetro padrão é o rootReducer
E o segundo parâmetro são ferramentas que a gente quer usar junto com nosso redux, neste caso é o redux dev tools
Ele vai checar se a gente tem salvo no navegador(window) o redux dev tools, se for true, então ele vai chamar a função redux dev tools, isso é padrão, está no repositório do git do redux dev tools. 
*/
const store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;