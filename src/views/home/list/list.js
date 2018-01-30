import Vue from 'vue';
import App from './App.vue';
import iView from '@/assets/iview/src';
import '@/assets/iview/src/styles/index.less';
Vue.use(iView);

new Vue({
    el:'#app',
    template: '<App/>',
    components: { App }
});