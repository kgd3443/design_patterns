<script setup lang="ts">
import { service, Singleton } from "./patterns/singleton";

// A) 모듈 캐시 기반
const onInc = () => service.inc();
const onReset = () => service.reset();
const onPing = () => console.log("service.ping():", service.ping());

service.addEventListener("change", () => {
  console.log("공유 카운트 =", service.count);
});

// B) 클래식 lazy
const s = Singleton.getInstance();
const onHello = () => s.sayHello();
</script>

<template>
  <main>
    <h1>Singleton 데모 (TS 모듈)</h1>

    <section style="margin: 16px 0;">
      <h3>A) 모듈 캐시 기반</h3>
      <button @click="onInc">+1</button>
      <button @click="onReset">Reset</button>
      <button @click="onPing">ping()</button>
      <p>값은 콘솔(F12)에서 확인하세요.</p>
    </section>

    <section>
      <h3>B) 클래식 lazy</h3>
      <button @click="onHello">sayHello()</button>
    </section>
  </main>
</template>

<style scoped>
button { margin-right: 8px; }
</style>
