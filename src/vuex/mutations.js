import * as types from './mutations_type';

export default {
    [types.IS_AUTH] (state, data) {
        state.customer = data.customer;
        state.adBoard = data.adBoard;
        state.customerNotice = data.customerNotice;
    },
    [types.LOGOUT] (state, isAuth) {
        state.isAuth = isAuth;
    }
}