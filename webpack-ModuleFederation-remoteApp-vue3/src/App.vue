<script setup>
import { ref, onMounted } from 'vue';
const count = ref(999);
onMounted(() => {
  console.log('vue3 远程应用');
  window.localStorage.setItem('vue3', 'vue3 远程应用');

  window.addEventListener('storage', (event) => {
    if (event.key === 'hostApp_token') {
      // window.localStorage.getItem('hostApp_token');
      console.log(
        '远程应用获取到最新消息啦~',
        window.localStorage.getItem('hostApp_token', event.newValue)
      );
    }
  });
});
</script>
<template>
  <div style="border: 1px solid red; padding: 10px; margin: 10px">
    <p>vue3 远程应用</p>
    <button @click="count++">Increment</button>
    {{ count }}
  </div>
</template>
<style scoped></style>
