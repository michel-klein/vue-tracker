<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <Formulario @ao-salvar-tarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input type="text" class="input" placeholder="Digite para filtrar" v-model="filtro" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa
    v-for="tarefa in tarefas"
    :key="JSON.stringify(tarefa)"
    :tarefa="tarefa"
    @ao-tarefa-clicada="selecionarTarefa"
    />
    <Box v-if="!tarefas.length">
    Você ainda não realizou nenhuma tarefa!
    </Box>
    <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar tarefa</p>
          <button class="delete" aria-label="close" @click="fecharModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">
            Descrição da tarefa
            </label>
            <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
            >
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
          <button class="button" @click="fecharModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watchEffect,
} from 'vue';
import { useStore } from '@/store';
import {
  ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS,
} from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref('');
    // eslint-disable-next-line max-len
    // const tarefas = computed(() => store.state.tarefa.tarefas.filter((t) => !filtro.value || t.descricao.includes(filtro.value)));

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro,
    };
  },
  components: {
    Formulario, Tarefa, Box,
  },
});
</script>

<style>
  .lista {
    padding: 1.25rem;
  }
</style>
