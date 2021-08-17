/* (2 na linha 1)
REDUX 6 - Criamos o index.js dentro de store; Ele será responsável por dar o bootstrap, levantar o ambiente de configuração do redux na nossa aplicação.; Importamos o createStore, que o nome já diz, é a store que vai conter os states 
REDUX SAGA 22 - Importamos o applyMiddleware para que a função createSagaMiddleware seja executada */
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules/rootReducer';

/* REDUX SAGA 19 - Agora vamos integrar o rootSaga aqui no arquivo principal do redux */
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

/* REDUX SAGA 20 - Já importamos o sagaMiddleware agora podemos importar nosso rootSaga */
import rootSaga from './modules/rootSaga';

/* REDUX SAGA 21 - Guardamos a referência da função createSagaMiddleware na variável sagaMiddleware, para podermos aplicar ela na nossa store; o createSagaMiddleware cria um interceptador de actions, ele vai capturar essas actions igual o reducer faz*/
const sagaMiddleware = createSagaMiddleware();

/* REDUX 7 - O primeiro parâmetro padrão é o rootReducer; E o segundo parâmetro são ferramentas que a gente quer usar junto com nosso redux, neste caso é o redux dev tools; Ele vai checar se a gente tem salvo no navegador(window) o redux dev tools, se for true, então ele vai chamar a função redux dev tools, isso é padrão, está no repositório do git do redux dev tools. */
const store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ? composeWithDevTools(applyMiddleware(sagaMiddleware)) /* REDUX SAGA 23 - Aplicamos todas as funções padrões para configuração do redux saga na nossa store; Aqui estamos realizando uma verificação ternária dupla, na primeira linha verificamos se tem o redux dev tools no navegador, se a linha de cima der certo, ai sim vai executar essa , que é o composeWithDevTools, se não der certo, ai ele vai pular o composeWithDevTools, e vai executar o applyMiddleware diretão mesmo */
  : applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga); /* REDUX SAGA 24 - Executamos aqui o nosso rootSaga(é config padrão) */

export default store;