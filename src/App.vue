<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @ao-tema-alterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
      <RouterView />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
    trocarTema(modoEscuroAtivo: boolean) {
      console.log(modoEscuroAtivo);
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
  components: {
    BarraLateral,
    Notificacoes,
  },
});
</script>

<style>
  main {
    --bg-primario: #fff;
    --texto-primario: #000;
  }
  main.modo-escuro {
    --bg-primario: #2b2d42;
    --texto-primario: #ddd;
  }
  .conteudo {
    background-color: var(--bg-primario);
  }
</style>
