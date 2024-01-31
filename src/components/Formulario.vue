<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input
        type="text"
        class="input"
        placeholder="Qual tarefa você deseja iniciar?"
        v-model="descricao">
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { NOTIFICAR } from '@/store/tipo-mutacoes';
import Temporizador from './Temporizador.vue';

export default defineComponent({
  name: 'FormularioVue',
  // data() {
  //   return {
  //     descricao: '',
  //     idProjeto: '',
  //   };
  // },
  setup(props, context) {
    const store = useStore(key);

    const descricao = ref('');
    const idProjeto = ref('');

    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      // eslint-disable-next-line max-len
      const projeto = projetos.value.find((p) => p.id === idProjeto.value);
      if (!projeto) {
        store.commit(NOTIFICAR, {
          titulo: 'Ops!',
          texto: 'Selecione um projeto antes de finalizar a tarefa!',
          tipo: TipoNotificacao.FALHA,
        });
        return;
      }
      context.emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find((proj) => proj.id === idProjeto.value),
      });
      descricao.value = '';
    };

    return {
      descricao,
      idProjeto,
      projetos,
      finalizarTarefa,
    };
  },
  components: { Temporizador },
  emits: ['aoSalvarTarefa'],
});
</script>

<style>
  .formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
  }
</style>
