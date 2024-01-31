<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import ITarefa from '@/interfaces/ITarefa';
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';

export default defineComponent({
  name: 'TarefaVue',
  components: { Cronometro, Box },
  props: {
    tarefa: { type: Object as PropType<ITarefa>, required: true },
  },
  methods: {
    tarefaClicada(): void {
      this.$emit('aoTarefaClicada', this.tarefa);
    },
  },
  emits: ['aoTarefaClicada'],
});
</script>

<style scoped>
  .clicavel {
    cursor: pointer;
  }
</style>
