/* eslint-disable import/no-cycle */
import clienteHttp from '@/http';
import IProjeto from '@/interfaces/IProjeto';
import { Estado } from '@/store';
import {
  OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO,
} from '@/store/tipo-acoes';
import {
  ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS,
} from '@/store/tipo-mutacoes';
import { Module } from 'vuex';

export interface EstadoProjeto {
  projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const novoProjeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(novoProjeto);
    },
    [ALTERA_PROJETO](state, projetoAlterado: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id === projetoAlterado.id);
      state.projetos[index] = projetoAlterado;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id !== id);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
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
    [ALTERAR_PROJETO](context, projetoAlterado: IProjeto) {
      return clienteHttp.put(`projetos/${projetoAlterado.id}`, projetoAlterado);
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return clienteHttp.delete(`projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id));
    },
  },
};
