/* REDUX SAGA 2 - Importo o takeLatest, que vai permitir atrelarmos uma função a uma action; Importo o all, que vai ser usado junto com o takeLatest pra vincular a função a uma action */
import { takeLatest, all, call, put } from 'redux-saga/effects'

/* REDUX SAGA 3 - Crio a action request petshops lá no types.js, e importo ela aqui*/
import types from './types';

import api from '../../../services/api'; /* REDUX SAGA 6 - Importo a api que busca dados do meu server com axios */
import { setPetshops, setPetshop } from './actions' /* REDUX SAGA 11 - Importo a action que criei na etapa anterior + PETSHOP QUERY 10 */

/* REDUX SAGA 1 - O asterisco é pq é uma generator function, ela pode ser inicializada e pausada para retornar resultados (yield); O redux saga vai escutar a action, depois vai lá no servidor buscar as informações das petshops e colocar no state. ; Na próxima etapa vamos atrelhar a nossa function requestPetshops a uma action, usando takelatest */
export function* requestPetshops() {
  const response = yield call(api.get, '/petshops') /* REDUX SAGA 7 - A sintaxe muda quando usamos generator functions, ao invés de usar await, usamos yield. + Não podemos chamar a função direto igual fazemos com async functions, neste caso, precisamos passar o método call do redux saga, os parâmetros do método call são as etapas que vamos executar, ele pode ter quantos parâmetros quiseremos. Se fosse um componente normal seria api.get('/petshops'), então fica assim: call(api.get, '/petshops') */
  const res = response.data; /* REDUX SAGA 8 - Pego aqui a resposta da requisição. O redux saga vai então passar a resposta para o reducer. */
  yield put(setPetshops(res.petshops))
}

/* PETSHOP QUERY 5 - 
O payload é o nome dado pra um objeto com os dados que a gente receba da requisição da action 
Aqui está configurada nossa requisição ao endpoint da api */
export function* requestPetshop(payload) {
  const response = yield call(api.get, `/petshop/${payload.id}`) /* REDUX SAGA 7 - A sintaxe muda quando usamos generator functions, ao invés de usar await, usamos yield. + Não podemos chamar a função direto igual fazemos com async functions, neste caso, precisamos passar o método call do redux saga, os parâmetros do método call são as etapas que vamos executar, ele pode ter quantos parâmetros quiseremos. Se fosse um componente normal seria api.get('/petshops'), então fica assim: call(api.get, '/petshops') */
  const res = response.data; /* REDUX SAGA 8 - Pego aqui a resposta da requisição. O redux saga vai então passar a resposta para o reducer. */
  yield put(setPetshop(res.petshop))
}

/* REDUX SAGA 4 - Se o usuário der 5 cliques, o nosso backend não vai fazer 5 requisições. O takelatest faz o backend pegar só o último clique
Implemento o all + takeLatest com a nova action que criei no types.js, a REQUEST_PETSHOPS; Bem parecido com as actions do woocommerce! */
/* PETSHOP QUERY 6 - SEGUNDA LINHA DO TAKELATEST*/
export default all([
    takeLatest(types.REQUEST_PETSHOPS, requestPetshops),
    takeLatest(types.REQUEST_PETSHOP, requestPetshop),
]);