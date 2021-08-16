/* REDUX 3 Criamos o rootReducer.
Ele serve para mesclar todos os estados do reducer em um estado único de verdade, pra que aí sim possamos usar.
Importo aqui o combineReducers, é padrão do rootReducer
*/

import { combineReducers } from 'redux'

/* REDUX 4 - Importo o arquivo reducer que criamos na etapa */
import shop from './shop/reducer'

/* REDUX 5 - o valor da propriedade shop será shop, então podemos usar a shorthand syntax, que é shop. ao invés de shop: shop, */
export default combineReducers({
  shop,
})