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
import { defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
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
