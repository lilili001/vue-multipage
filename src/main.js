// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iview from '../../iview/src';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
Vue.use(iview);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

var info = (text) => {
    if (app.$Message) app.$Message.destroy();
    app.$Message.error({
        content: text,
        duration: 3,
        closable: true
    });
};
Vue.prototype.$http.interceptors.response.use(  (response)=> {
    var suffix = ' 请求状态:' + response.status+':'+response.statusText;
    if (!(response.data.success) && response.data.message) {
        info(response.data.message );
    }
    return response
},   (error) => {

    var err = error.response;
    info( err.data + ' | ' + err.status + err.statusText );

    for(var attr in err.data.errors){
       // console.log( err.data.errors[attr][0] );
        //info( err.data.errors[attr][0] )
    }
    //info( error.response.data.message + '| status:'+ error.response.status );
    // Do something with response error
    return Promise.reject(error)
});

window._ = require('underscore');
