<script setup>
import { ref } from 'vue';
const count = ref(999);
</script>
<template>
  <div style="border: 1px solid red; padding: 10px; margin: 10px;">
    <p>vue3 远程应用</p>
    <button @click="count++">Increment</button>
    {{ count }}
  </div>
</template>
<style scoped></style>
