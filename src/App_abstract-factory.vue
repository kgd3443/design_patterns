<script setup lang="ts">
import { ref } from "vue";
import { WindowsFactory, MacFactory, buildUI, type UIFactory } from "./patterns/abstract-factory";

const os = ref<"Windows" | "Mac">("Windows");
const logs = ref<string[]>([]);

function run() {
  let f: UIFactory = os.value === "Windows" ? new WindowsFactory() : new MacFactory();
  logs.value = buildUI(f);
}
</script>

<template>
  <main class="wrap">
    <h1>Abstract Factory 데모</h1>
    <div class="row">
      <label>OS</label>
      <select v-model="os">
        <option value="Windows">Windows</option>
        <option value="Mac">Mac</option>
      </select>
      <button @click="run">UI 빌드</button>
    </div>
    <ul>
      <li v-for="(l,i) in logs" :key="i">{{ l }}</li>
    </ul>
  </main>
</template>

<style scoped>
.wrap { max-width: 720px; margin: 32px auto; padding: 0 16px; }
.row { display: flex; gap: 10px; align-items: center; margin: 8px 0; }
select, button { padding: 8px 10px; border-radius: 8px; border: 1px solid #555; background: #1b1b1b; color: #eee; }
button { cursor: pointer; }
</style>
