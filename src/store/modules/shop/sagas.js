/* REDUX SAGA 2 - Importo o takeLatest, que vai permitir atrelarmos uma função a uma action; Importo o all, que vai ser usado junto com o takeLatest pra vincular a função a uma action */
// SPLIT RULES 32
import { takeLatest, all, call, put, select } from 'redux-saga/effects'

/* REDUX SAGA 3 - Crio a action request petshops lá no types.js, e importo ela aqui*/
import types from './types';

import api from '../../../services/api'; /* REDUX SAGA 6 - Importo a api que busca dados do meu server com axios */
import { setPetshops, setPetshop } from './actions' /* REDUX SAGA 11 - Importo a action que criei na etapa anterior + PETSHOP QUERY 10 */
import Swal from 'sweetalert2' /* SPLIT RULES 34 - Implemento o sweetalert, ele é uma lib para mostrar mensagens de sucesso - yarn add sweetalert2 + importo o sweetalert

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

// SPLIT RULES 30 - Crio a função makePurchase() - vazia por enquanto
/* SPLIT RULES 33 - 
Começo a criar a lógica. 
Usando o hook select a gente consegue buscar um objeto da nossa store. A gente usa select no saga, ao invés de useSelector 
Vamos configurar para postarmos o objeto transaction na rota purchase, do tipo post. Aqui no saga usamos yield ao invés de await. */
/* SPLIT RULES 35 - A gente precisa saber se deu erro ou não no nosso post.
Criamos a variavel res para armazenar a resposta que o pagarme deu pra gente. 
Se na response.data (que está salva em res) conter um erro, então a gente vai mandar uma mensagem usando o nosso Swal.
O swal pede 3 parâmetros, um icone, um título, e um texto. Os 2 primeiros são fáceis. O terceiro mostra a mensagem de erro que o servidor retornou. */
/* SPLIT RULES 36 - Precisamos avisar o cliente se o pagamento deu certo ou não.
Se a resposta do endpoint do pagarme for diferente de paid, significa que deu errado.
O endpoint do pagarme responde várias coisas quando a requisição é realizada (pra ver isso, é necessário fazer um post na create transaction, pra visualizar todos estes campos que o endpoint do pagarme retorna.
Um destes campos é o motivo da recusa do pgto. E aí, a gente acessa o objeto json até o refuse_reason , e mostra na tela para o usuário. */
/* SPLIT RULES 37 - Se der tudo certo com o pgto, vamos mostrar esta mensagem abaixo */
export function* makePurchase() {
  const { transaction } = yield select(state => state.shop)
  const response = yield call(api.post, `/purchase`, transaction)
  const res = response.data; 

  if (res.error) {
    Swal.fire({
      icon: 'error',
      title:'Oopss...',
      text: res.message
    })

    return false;
  }

  if(res.data.status !== 'paid') {
    Swal.fire({
      icon: 'error',
      title:'Oopss...',
      text: res.data.refuse_reason,
    })
    return false;
  }

  Swal.fire({
    icon: 'success',
    title:'Tudo certo',
    text: 'Sua compra foi aprovada com sucesso',
  })

}

/* REDUX SAGA 4 - Se o usuário der 5 cliques, o nosso backend não vai fazer 5 requisições. O takelatest faz o backend pegar só o último clique
Implemento o all + takeLatest com a nova action que criei no types.js, a REQUEST_PETSHOPS; Bem parecido com as actions do woocommerce! */
/* PETSHOP QUERY 6 - SEGUNDA LINHA DO TAKELATEST*/
// SPLIT RULES 31
export default all([
    takeLatest(types.REQUEST_PETSHOPS, requestPetshops),
    takeLatest(types.REQUEST_PETSHOP, requestPetshop),
    takeLatest(types.MAKE_PURCHASE, makePurchase),
]);