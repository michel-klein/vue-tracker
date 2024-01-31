<template>
  <Formulario @ao-salvar-tarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa
    v-for="tarefa in tarefas"
    :key="JSON.stringify(tarefa)"
    :tarefa="tarefa"
    />
    <Box v-if="!tarefas.length">
    Você ainda não realizou nenhuma tarefa!
    </Box>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';

export default defineComponent({
  name: 'App',
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefas),
      store,
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
