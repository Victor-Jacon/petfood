/* Redux 10 + Immer 1 - Importamos o immer para adicionar imutabilidade no nosso projeto, que é uma boa prática para gerenciar o estado com redux. */
import produce from 'immer';
import types from './types'

/* REDUX 1 - Crio o arquivo reducer.js; Crio a variável INITIAL_STATE; Coloco INITIAL_STATE como valor padrão inicial do redux [padrão]; Escuta as actions da ui para mandar para a store, tipo um event handler; O state é o estado inicial que ele vai inicializar, igual o estado inicial do useState, se for uma array, quais os itens iniciais? Se for uma string, vai ter um valor pre-definido? é Essa a lógica */
const INITIAL_STATE = {
  customer: {},
  
  /* REDUX SAGA 16 - Definimos um valor incial para o objeto petshops, como vai ser uma listagem de petshops que vai vir do nosso mongoDB, então a gente coloca dentro de uma array, e o valor inicial dele será vazio. */
  petshops: [],
  
  /* MARKER 1 - Quando o usuário clicar no marker no mapa, ele precisa ficar verde. Pra isso, precisamos gerenciar o estado. Quando queremos gerenciar o estado de um objeto, colocamos ele aqui no nosso reducer. O nome do objeto que conterá o estado do marker (se está clicado ou não) é petshopMapSelected 
  Queremos movimentar o mapa de acordo com o parceiro que o usuário tiver clicado. Criamos o objeto MapCenter pra gerenciar o estado. O valor inicial ideal dele seria a localização do usuário, mas vamos iniciar assim por enquanto. */
  petshopMapSelected: null,
  mapCenter: { /* MARKER 1 */
    lat: -23.561684,
    lng: -46.625378
  },

  /* PETSHOP QUERY 8 */
  petshop: {},
  cart: []
}

function shop (state = INITIAL_STATE, action) {

/* REDUX 2 - O type, que a gente define ali nos cases, são como se fossem eventos do js (tipo o que a gente passa dentro do event listener do JS) */
  switch (action.type) {
    case types.SET_CUSTOMER: {
      /* Redux 11 + Immer 2; 1º paramêtro: nosso estado; 2º parâmetro: copia exata do nosso state (antes de sobreescrevermos) */
      return produce(state, (draft) => {
          draft.customer = action.customer;
      })
    }

    /* REDUX SAGA 15 - Até o passo 14 a gente tava dando dispatch de uma action que o reducer não estava esperando. Neste momento vamos preparar o reducer para ele saber o que ele vai receber de dispatch do nosso frontend*/
    case types.SET_PETSHOPS: {
      return produce(state, (draft) => {
          draft.petshops = action.petshops; /* REDUX SAGA 17 - Agora que a array petshops tem um valor inicial, podemos colocar ele aqui (draft.petshops = action.petshops) */
      })
    }

    /* MARKER 9 - Crio o case do reducer para gerenciar o estado
    O draft será o objeto que eu criei no MARKER 1, que está no topo deste arquivo, dentro de initial state. 
    O action a gente coloca action.petshop pq é o objeto que estamos enviando do actions.js */
    case types.SET_PETSHOP_MAP_SELECTED: {
      return produce(state, (draft) => {
        draft.petshopMapSelected = action.petshop; 
      })
    }

    /* MARKER 10 - Mesma coisa do passo 9 */
    case types.SET_MAP_CENTER: {
      return produce(state, (draft) => {
        draft.mapCenter = action.location; 
      })
    }

    /* PETSHOP QUERY 9 */
    case types.SET_PETSHOP: {
      return produce(state, (draft) => {
        draft.petshop = action.petshop; 
      })
    }

    /* CART 3 - 
    Precisamos verificar se o produto existe dentro do carrinho, para saber se vamos adicionar ou remover.
    Nosso carrinho é uma array. Arrays possuem posições/index. 
    Quero executar uma lógica e salvar o resultado dela na variável index, pra depois eu verificar o que eu farei com a ação do usuário (se vai adicionar ou remover do carrinho)
    No index ficará salvo o resultado de: Existe algum produto no meu carrinho que tem o mesmo ID que o produto que eu acabei de clicar? Salve a resposta desta lógica na variavel index.
    Se o index for diferente de -1, ou seja, se ele existir, faça o seguinte: percorra a array a partir do item encontrado, e exclua 1 item a partir dele, ou seja, exclua somente ele mesmo. 
    Caso contrário (o produto não exista), utilize o método push (que adiciona registros em array), e pegue o produto que foi clicado e adicione na array do carrinho. */
    case types.TOGGLE_CART_PRODUCT: {
      return produce(state, (draft) => {
        const index = draft.cart.findIndex((p) => p._id === action.product._id)
        if (index !== -1) {
          draft.cart.splice(index, 1);
        } else {
          draft.cart.push(action.product);
        }
      })
    }

    default:
      return state;
  }
}

export default shop;