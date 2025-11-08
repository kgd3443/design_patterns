<script setup lang="ts">
import { ref } from "vue";
import {
  NoDiscount, Seasonal10, BlackFriday25, VIPMinus3000,
  applyStrategy, type PricingStrategy
} from "./patterns/strategy";

const strategies: PricingStrategy[] = [
  new NoDiscount(), new Seasonal10(), new BlackFriday25(), new VIPMinus3000()
];

const base = ref(20000);
const selectedIndex = ref(0);        // ← 인덱스로 선택
const finalPrice = ref<number | null>(null);

function run() {
  const s = strategies[selectedIndex.value];   // 타입: PricingStrategy (undefined 아님)
  finalPrice.value = applyStrategy(base.value, s);
}
</script>

<template>
  <main class="wrap">
    <h1>Strategy 데모</h1>

    <div class="row">
      <label>기본가</label>
      <input type="number" v-model.number="base" min="0" step="100" />
    </div>

    <div class="row">
      <label>전략</label>
      <select v-model.number="selectedIndex"> <!-- number 수식어 -->
        <option v-for="(s, i) in strategies" :key="i" :value="i">
          {{ s.name() }}
        </option>
      </select>
      <button @click="run">적용</button>
    </div>

    <p v-if="finalPrice !== null" class="price">최종가: <b>{{ finalPrice }}</b> 원</p>
  </main>
</template>

<style scoped>
.wrap { max-width: 720px; margin: 32px auto; padding: 0 16px; }
.row { display: flex; gap: 10px; align-items: center; margin: 8px 0; }
input, select, button { padding: 8px 10px; border-radius: 8px; border: 1px solid #555; background: #1b1b1b; color: #eee; }
button { cursor: pointer; }
.price { margin-top: 8px; }
</style>