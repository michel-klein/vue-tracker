import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import Projetos from '@/views/Projetos.vue';
import Formulario from '@/views/Projetos/Formulario.vue';
import Tarefas from '../views/Tarefas.vue';

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: Tarefas,
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component: Projetos,
  },
  {
    path: '/projetos/novo',
    name: 'Novo Projeto',
    component: Formulario,
  },
  {
    path: '/projetos/:id',
    name: 'Editar projeto',
    component: Formulario,
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
