import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
var d = new Date();
const store = new Vuex.Store({
    state : {
        customer: {
            bname: '',
            userid: '',
            id: '',
            isAuth: false,
        },
        orderList: [],
        adBoard: [],
        favorite: [],
        delivererNotice: [],
        orderTotal: 0,
        orderQty: 0,
        deliveryDate: d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate(),
        userAddress: '',
        orderRequest: '배송 및 상품에 대한 추가 요청사항 입력',
        goodsList: [],
        orderHistory: [],
        requestHistory: [],
        statistics: {},
        favoriteInsert:[],
        favoriteDelete:[]
    }
})

export default store;