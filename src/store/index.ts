/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import IProjeto from '@/interfaces/IProjeto';
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import { INotificacao } from '@/interfaces/INotificacao';
import clienteHttp from '@/http';
import ITarefa from '@/interfaces/ITarefa';
import {
  ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR,
} from './tipo-mutacoes';
import {
  ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO, OBTER_TAREFAS, CADASTRAR_TAREFA,
} from './tipo-acoes';

interface Estado {
  projetos: IProjeto[],
  notificacoes: INotificacao[],
  tarefas: ITarefa[],
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [],
    tarefas: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id !== id);
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);
      setTimeout(() => {
        // eslint-disable-next-line max-len
        state.notificacoes = state.notificacoes.filter((notificacao) => notificacao.id !== novaNotificacao.id);
      }, 3000);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      clienteHttp.get('projetos')
        .then((response) => commit(DEFINIR_PROJETOS, response.data));
    },
    [CADASTRAR_PROJETO](context, nomeProjeto: string) {
      return clienteHttp.post('projetos', {
        nome: nomeProjeto,
      });
    },
    [ALTERAR_PROJETO](context, projeto: IProjeto) {
      return clienteHttp.put(`projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return clienteHttp.delete(`projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id));
    },
    [OBTER_TAREFAS]({ commit }) {
      clienteHttp.get('tarefas')
        .then((response) => commit(DEFINIR_TAREFAS, response.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return clienteHttp.post('tarefas', tarefa)
        .then((response) => commit(ADICIONA_TAREFA, response.data));
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
