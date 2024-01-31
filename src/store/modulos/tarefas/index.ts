/* eslint-disable import/no-cycle */
import http from '@/http';
import ITarefa from '@/interfaces/ITarefa';
import { Estado } from '@/store';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from '@/store/tipo-acoes';
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from '@/store/tipo-mutacoes';
import { Module } from 'vuex';

export interface EstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, novaTarefa: ITarefa) {
      state.tarefas.push(novaTarefa);
    },
    [ALTERA_TAREFA](state, tarefaAlterada: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id === tarefaAlterada.id);
      state.tarefas[index] = tarefaAlterada;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      http.get('tarefas')
        .then((response) => commit(DEFINIR_TAREFAS, response.data));
    },
    [CADASTRAR_TAREFA]({ commit }, novaTarefa: ITarefa) {
      return http.post('/tarefas', novaTarefa)
        .then((resposta) => commit(ADICIONA_TAREFA, resposta.data));
    },
    [ALTERAR_TAREFA]({ commit }, tarefaAlterada: ITarefa) {
      return http.put(`/tarefas/${tarefaAlterada.id}`, tarefaAlterada)
        .then(() => commit(ALTERA_TAREFA, tarefaAlterada));
    },
  },
};
