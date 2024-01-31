/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import IProjeto from '@/interfaces/IProjeto';
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import { INotificacao } from '@/interfaces/INotificacao';
import clienteHttp from '@/http';
import ITarefa from '@/interfaces/ITarefa';
import {
  ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, NOTIFICAR,
} from './tipo-mutacoes';
import {
  OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA,
} from './tipo-acoes';
import { EstadoProjeto, projeto } from './modulos/projeto';

export interface Estado {
  notificacoes: INotificacao[],
  tarefas: ITarefa[],
  projeto: EstadoProjeto
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: [],
    },
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);
      setTimeout(() => {
        // eslint-disable-next-line max-len
        state.notificacoes = state.notificacoes.filter((notificacao) => notificacao.id !== novaNotificacao.id);
      }, 3000);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projeto.projetos = projetos;
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((tar) => tar.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      clienteHttp.get('tarefas')
        .then((response) => commit(DEFINIR_TAREFAS, response.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return clienteHttp.post('tarefas', tarefa)
        .then((response) => commit(ADICIONA_TAREFA, response.data));
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return clienteHttp.put(`tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERAR_TAREFA, tarefa));
    },
  },
  modules: {
    projeto,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
