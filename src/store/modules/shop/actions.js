/* REDUX BOAS PRÁTICAS 1 - No nome da action, a gente coloca @módulo/nomeDaAction */

import types from './types';

export function setCustomerStore(customer) {
    return { type: types.SET_CUSTOMER, customer }
}
