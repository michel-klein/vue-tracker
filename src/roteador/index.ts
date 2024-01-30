import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import Projetos from '@/views/Projetos.vue';
import Formulario from '@/views/Projetos/Formulario.vue';
import Lista from '@/views/Projetos/Lista.vue';
import Tarefas from '../views/Tarefas.vue';

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: Tarefas,
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: Lista,
      },
      {
        path: 'novo',
        name: 'Novo Projeto',
        component: Formulario,
      },
      {
        path: ':id',
        name: 'Editar projeto',
        component: Formulario,
        props: true,
      },
    ],
  },
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
