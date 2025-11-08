<script setup lang="ts">
import "./patterns/factory";

// 직접 호출해서 확인:
function runWindows() { clientApp("Windows"); }
function runMac()     { clientApp("Mac"); }
</script>

<template>
  <button @click="runWindows">Windows Dialog</button>
  <button @click="runMac">Mac Dialog</button>
</template>



