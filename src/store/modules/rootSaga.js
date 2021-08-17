/* REDUX SAGA 18 - Criamos o arquivo rootSaga.js, ele tem o mesmo propósito do rootReducer.js, a ideia dele é mesclar todos os nossos sagas. Isso aqui é padrão. */

import { all } from 'redux-saga/effects';
import shop from './shop/sagas';

export default function* rootSaga() {
    return yield all([shop]);
}