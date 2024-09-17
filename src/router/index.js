import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/HomeComponent.vue'
import HelloComponent from '@/components/HelloWorld.vue'


const routes = [
    {
        path: '/payment-done',
        name: 'DONE',
        component: HomeComponent
    },
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloComponent
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(){
        return { top: 0 }
    },
});

export default router