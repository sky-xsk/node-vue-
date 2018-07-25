import Vue from 'vue'
import Router from 'vue-router'
import register from '@/view/register'
import postnews from '@/view/postnews'
import postnewsDetails from '@/view/postnewsDetails'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'register',
        component: register
    },{
        path: '/postnews',
        name: 'postnews',
        component: postnews
    },{
        path: '/postnewsDetails/:ids',
        name: 'postnewsDetails',
        component: postnewsDetails
    }]
})