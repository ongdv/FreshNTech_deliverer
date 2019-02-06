import Vue from 'vue'
import Router from 'vue-router'
import {
  Main,
  OrderHistory,
  RefundHistory,
  Statistics,
  Setting,
  Auth,
  AddFavorite,
  TodayDelivery,
  TotalHistory,
  MapView,
  Refund
} from "../components/Layout/";
import store from '../vuex/store';
Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  if(store.state.customer.isAuth){
    console.log(store.state);
    return next();
  }
  next('/login');
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: '/login',
      name: 'Auth',
      component: Auth,
      props: true
    },
    {
      path: '/totalHistory',
      name: 'TotalHistory',
      component: TotalHistory,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: '/orderHistory',
      name: 'OrderHistory',
      component: OrderHistory,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: '/refundHistory',
      name: 'RefundHistory',
      component: RefundHistory,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: '/refund',
      name: 'Refund',
      component: Refund,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: '/mapView',
      name: 'MapView',
      component: MapView,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: '/addFavorite',
      name: 'AddFavorite',
      component: AddFavorite,
      props: true,
      beforeEnter: requireAuth()
    },
    {
      path: '/todayDelivery',
      name: 'TodayDelivery',
      component: TodayDelivery,
      props: true,
      beforeEnter: requireAuth()
    }
  ]

})
