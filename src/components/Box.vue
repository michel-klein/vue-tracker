<template>
  <div class="box has-text-weight-bold">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BoxVue',
});
</script>

<style scoped>
  .box {
    background: #FAF0CA;
  }
</style>
