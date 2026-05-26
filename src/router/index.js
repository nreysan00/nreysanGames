import { createRouter, createWebHistory } from 'vue-router'
import {ref} from 'vue';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Register.vue'
import Busqueda from '../views/Busqueda.vue'
import MiLista from '../views/MiLista.vue';
import VerJuego from '../views/VerJuego.vue';
import Admin from '../views/Admin.vue';
import PerfilUsuario from '../views/PerfilUsuario.vue';
// import HomeLogueado from '../views/HomeLogueado.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Login,
            beforeEnter: (to, from, next) => {
                const usuarioRaw = localStorage.getItem('login');

                const ruta = to.name === 'login';

                //Si el usuario ya tiene sesión y quiere ir a login lo mandamos al home
                if (usuarioRaw && ruta) {
                    next({ name: 'home' }); 
                } else {
                    next();
                }
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Registro,
            beforeEnter: (to, from, next) => {
                const usuarioRaw = localStorage.getItem('login');

                const ruta = to.name === 'register';

                //Si el usuario ya tiene sesión y quiere ir al registro lo mandamos al home
                if (usuarioRaw && ruta) {
                    next({ name: 'home' }); 
                } else {
                    next();
                }
            }
        },
        {
            path: '/busqueda/:busquedaInput?',
            name: 'busqueda',
            component: Busqueda
        },
        {
            path: '/milista/',
            name: 'milista',
            component: MiLista,
            beforeEnter: (to, from, next) => {
                const usuarioRaw = localStorage.getItem('login');

                if (!usuarioRaw) {
                    alert("Debes iniciar sesión para acceder.");
                    return next({ name: 'home' }); 
                }
                next();
            }
        },
        {
            path: '/juego/:id',
            name: 'verjuego',
            component: VerJuego
        },
        {
            path: '/perfil/:username?',
            name: 'perfil',
            component: PerfilUsuario
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            beforeEnter: (to, from, next) => {
                const usuarioRaw = localStorage.getItem('login');
                if (!usuarioRaw) return next({ name: 'home' });
                const usuario = JSON.parse(usuarioRaw);
                if (usuario.username !== 'admin') return next({ name: 'home' });
                next();
            }
        }
    ],
})

export default router