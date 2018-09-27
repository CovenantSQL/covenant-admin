import Home from '~/pages/Home'
import Wiki from '~/pages/Wiki'

export default [
  { path: '/', exact: true, component: Home },
  { path: '/quickstart', component: Wiki }
]
