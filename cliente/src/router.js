import Vue from 'vue'
import Router from 'vue-router'
import PaginaPrincipal from './views/PaginaPrincipal.vue'
import PaginaContexto from './views/PaginaContexto.vue'
import PaginaProposito from './views/PaginaProposito'
import PaginaEstudia from './views/PaginaEstudia'
import PaginaPerfil from './views/PaginaPerfil'
import PaginaJuegos from './views/PaginaJuegos'
import RuletaPep from './views/RuletaPep'
import PaginaPal from './views/PaginaPal'
import login from './views/login'
import registro from './views/registro'
import registroPal from './views/registroPal'
import loginPal from './views/loginPal'
import loginTS from './views/loginTS'
import registroTS from './views/registroTS'
import PaginaTyping1 from './views/PaginaTS1'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: PaginaPrincipal
        },
        {
            path: '/TypingSpeed',
            name: 'TS1',
            component: PaginaTyping1
        },
        {
            path: '/Contexto',
            name: 'contexto',
            component: PaginaContexto
        },
        {
            path: '/Proposito',
            name: 'proposito',
            component: PaginaProposito
        },
        {
            path: '/Estudia',
            name: 'estudia',
            component: PaginaEstudia
        },
        {
            path: '/Perfil',
            name: 'perfil',
            component: PaginaPerfil
        },
        {
            path: '/Juegos',
            name: 'juegos',
            component: PaginaJuegos
        },
        {
            path: '/RuletaPep',
            name: 'RuletaPep',
            component:RuletaPep
        },
        {
            path: '/Palabra',
            name: 'palabra',
            component: PaginaPal
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/registro',
            name: 'registro',
            component: registro
        },
        {
            path: '/registroPal',
            name: 'registroPal',
            component: registroPal
        },
        {
            path: '/loginPal',
            name: 'loginPal',
            component: loginPal
        },
        {
            path: '/loginTS',
            name: 'loginTS',
            component: loginTS
        },
        {
            path: '/registroTS',
            name: 'registroTS',
            component: registroTS
        }
    ]
})
