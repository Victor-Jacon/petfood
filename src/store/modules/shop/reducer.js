/* Redux 10 + Immer 1 
Importamos o immer para adicionar imutabilidade no nosso projeto, que é uma boa prática para gerenciar o estado com redux. */

import produce from 'immer';
import types from './types'

/* Escuta as actions da ui para mandar para a store, tipo um event handler */
/* O state é o estado inicial que ele vai inicializar, igual o estado inicial do useState, se for uma array, quais os itens iniciais? Se for uma string, vai ter um valor pre-definido? é Essa a lógica */

/* REDUX 1 - 
Crio o arquivo reducer.js + 
Crio a variável INITIAL_STATE 
Coloco INITIAL_STATE como valor padrão inicial do redux [padrão]*/
const INITIAL_STATE = {
  customer: {},
}

function shop (state = INITIAL_STATE, action) {

/* REDUX 2 - O type, que a gente define ali nos cases, são como se fossem eventos do js (tipo o que a gente passa dentro do event listener do JS) */
  switch (action.type) {
    case types.SET_CUSTOMER: {
      /* Redux 11 + Immer 2
      1º paramêtro: nosso estado
      2º parâmetro: copia exata do nosso state (antes de sobreescrevermos)
      */
      return produce(state, (draft) => {
          draft.customer = action.customer;
      })
    }

    default:
      return state;
  }
}

export default shop;