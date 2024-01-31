/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import { INotificacao } from '@/interfaces/INotificacao';
import {
  NOTIFICAR,
} from './tipo-mutacoes';
import { EstadoProjeto, projeto } from './modulos/projeto';
import { EstadoTarefa, tarefa } from './modulos/tarefas';

export interface Estado {
  notificacoes: INotificacao[],
  tarefa: EstadoTarefa,
  projeto: EstadoProjeto
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    tarefa: {
      tarefas: [],
    },
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
  },
  modules: {
    projeto,
    tarefa,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
