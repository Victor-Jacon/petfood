/* REDUX BOAS PRÁTICAS 1 - No nome da action, a gente coloca @módulo/nomeDaAction */

import types from './types';

export function setCustomerStore(customer) {
    return { type: types.SET_CUSTOMER, customer }
}

/* REDUX SAGA 10 - 
Crio minha action requestPetshops
Crio minha action setPetshops(essa action vai enviar as petshops para nosso reducer. 
Ou seja, não só nossa UI pode mandar actions pro reducer, o redux-saga tb pode mandar actions para o reducer) */
export function requestPetshops() {
    return { type: types.REQUEST_PETSHOPS }
}

export function setPetshops(petshops) {
    return { type: types.SET_PETSHOPS, petshops }
}

/* MARKER 8 - Criei a action que eu defini no types na etapa anterior */

export function setShopMapSelected(petshop) {
    return { type: types.SET_PETSHOP_MAP_SELECTED, petshop }
}

export function setMapCenter(location) {
    return { type: types.SET_MAP_CENTER, location }
}

/* PETSHOP QUERY 4 */

export function requestPetshop(id) {
    return { type: types.REQUEST_PETSHOP, id }
}

/* PETSHOP QUERY 7 */
export function setPetshop(petshop) {
    return { type: types.SET_PETSHOP, petshop }
}

/* CART 2 */
export function toggleCartProduct(product) {
    return { type: types.TOGGLE_CART_PRODUCT, product }
}

// SPLIT RULES 19
export function setTransaction(transaction) {
    return { type: types.SET_TRANSACTION, transaction }
}

// SPLIT RULES 29 - Nosso reducer não vai escutar este cara aqui, quem vai escutar ele será o saga.
export function makePruchase() {
    return { type: types.MAKE_PURCHASE }
}