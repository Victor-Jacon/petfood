/* REDUX BOAS PRÁTICAS 4 
A gente tem muito boilerplate, código repetido, quando usamos o redux do jeito normal, sem seguir as boas práticas.
A gente repete o nome da action em vários lugares diferentes, para realizar 1 fluxo de ação apenas. E isso além de ficar boilerplate, tem grande chance de erro, pq ele é escrito de forma estática (quando não seguimos as boas práticas)
Pra resolver isso, criamos o arquivo types.js, que vai conter
*/

const types = {
    SET_CUSTOMER: '@shop/SET_CUSTOMER',
    REQUEST_PETSHOPS: '@shop/REQUEST_PETSHOPS',
    SET_PETSHOPS: '@shop/SET_PETSHOPS', /* REDUX SAGA 9 - Crio minha action type */
    
    // MARKER 7 - Criamos o type pra gerenciar o estado de clicado ou não no mapa + map center */
    SET_PETSHOP_MAP_SELECTED: '@shop/SET_PETSHOP_MAP_SELECTED',
    SET_MAP_CENTER: '@shop/SET_MAP_CENTER',

    // PETSHOP QUERY 3
    REQUEST_PETSHOP: '@shop/REQUEST_PETSHOP',
    SET_PETSHOP: '@shop/SET_PETSHOP',

    // CART 1
    TOGGLE_CART_PRODUCT: '@shop/TOGGLE_CART_PRODUCT',

    // SPLIT RULES 18
    SET_TRANSACTION: '@shop/SET_TRANSACTION',

    // SPLIT RULES 28
    MAKE_PURCHASE: '@shop/MAKE_PURCHASE'

}

export default types;