<script setup lang="ts">
import { ref } from "vue";
import { ComputerFacade } from "./patterns/facade";

const pc = new ComputerFacade();
const logs = ref<string[]>([]);

function powerOn()  { logs.value = pc.start(); }
function powerOff() { logs.value = pc.shutdown(); }
</script>

<template>
  <main class="wrap">
    <h1>Facade 데모</h1>
    <div class="row">
      <button @click="powerOn">전원 켜기</button>
      <button @click="powerOff">전원 끄기</button>
    </div>
    <ul>
      <li v-for="(l,i) in logs" :key="i">{{ l }}</li>
    </ul>
  </main>
</template>

<style scoped>
.wrap { max-width: 720px; margin: 32px auto; padding: 0 16px; }
.row { display: flex; gap: 10px; margin: 8px 0; }
button { padding: 8px 12px; border-radius: 8px; border: 1px solid #555; background: #1f1f1f; color: #eee; cursor: pointer; }
</style>
