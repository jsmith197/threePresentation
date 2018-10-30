import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/First'
import Second from '@/components/Second'
import Third from '@/components/Third'
import Fourth from '@/components/Fourth'
import Fifth from '@/components/Fifth'
import Sixth from '@/components/Sixth'
import Seventh from '@/components/Seventh'
import Eighth from '@/components/Eighth'
import Ninth from '@/components/Ninth'
import Tenth from '@/components/Tenth'
import Eleventh from '@/components/Eleventh'
import Twelfth from '@/components/Twelfth'
import Thirteenth from '@/components/Thirteenth'
import Fourteenth from '@/components/Fourteenth'
import Fithteenth from '@/components/Fithteenth'
import Sixteenth from '@/components/Sixteenth'
import Seventeenth from '@/components/Seventeenth'
import Last from '@/components/Last'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'First',
      component: First
    },
    {
      path: '/second',
      name: 'Second',
      component: Second
    },
    {
      path: '/third',
      name: 'Third',
      component: Third
    },
    {
      path: '/fourth',
      name: 'Fourth',
      component: Fourth
    },
    {
      path: '/fifth',
      name: 'Fifth',
      component: Fifth
    },
    {
      path: '/sixth',
      name: 'Sixth',
      component: Sixth
    },
    {
      path: '/seventh',
      name: 'Seventh',
      component: Seventh
    },
    {
      path: '/eighth',
      name: 'Eighth',
      component: Eighth
    },
    {
      path: '/ninth',
      name: 'Ninth',
      component: Ninth
    },
    {
      path: '/tenth',
      name: 'Tenth',
      component: Tenth
    },
    {
      path: '/eleventh',
      name: 'Eleventh',
      component: Eleventh
    },
    {
      path: '/twelfth',
      name: 'Twelfth',
      component: Twelfth
    },
    {
      path: '/thirteenth',
      name: 'Thirteenth',
      component: Thirteenth
    },
    {
      path: '/fourteenth',
      name: 'Fourteenth',
      component: Fourteenth
    },
    {
      path: '/fithteenth',
      name: 'Fithteenth',
      component: Fithteenth
    },
    {
      path: '/sixteenth',
      name: 'Sixteenth',
      component: Sixteenth
    },
    {
      path: '/seventeenth',
      name: 'Seventeenth',
      component: Seventeenth
    },
    {
      path: '/last',
      name: 'Last',
      component: Last
    }
  ]
})
