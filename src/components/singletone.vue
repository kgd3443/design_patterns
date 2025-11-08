<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";

/** 싱글톤 서비스 (전역 캐시 사용: HMR에서도 1개 유지) */
class Service extends EventTarget {
  private _count = 0;
  ping() { return "pong"; }
  get count() { return this._count; }
  inc() { this._count++; this.dispatchEvent(new Event("change")); }
  reset() { this._count = 0; this.dispatchEvent(new Event("change")); }
}

// 전역 캐시 키 & 인스턴스
const KEY = Symbol.for("app.service");
const g = globalThis as Record<symbol, Service | undefined>;
export const service = g[KEY] ??= new Service(); // ← named export (OK in normal <script>)

export default defineComponent({
  name: "SingletonPanel",
  props: { label: { type: String, required: true } },
  setup() {
    const count = ref(service.count);
    const onChange: EventListener = () => { count.value = service.count; };
    const addOne = () => service.inc();
    const reset = () => service.reset();

    onMounted(() => service.addEventListener("change", onChange));
    onBeforeUnmount(() => service.removeEventListener("change", onChange));

    return { count, addOne, reset };
  }
});
</script>

<template>
  <div class="panel">
    <h3>{{ label }}</h3>
    <p>공유 카운트: <strong>{{ count }}</strong></p>
    <div class="row">
      <button @click="addOne">+1 (singleton)</button>
      <button class="ghost" @click="reset">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.panel {
  padding: 14px 16px;
  border: 1px solid #444;
  border-radius: 12px;
  margin: 10px 0;
  background: #111;
}
.row { display: flex; gap: 8px; }
button {
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #555;
  cursor: pointer;
  background: #1c1c1c;
}
button.ghost { background: transparent; }
</style>
