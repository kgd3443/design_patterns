<script setup lang="ts">
import { ref, watch } from "vue";
import { Stock, PriceDisplay, PriceAlert, type Observer } from "./patterns/observer";

// Subject 인스턴스 & 제공된 Observers
const stock = new Stock();
const display = new PriceDisplay();
const alertObs = new PriceAlert();

// 화면 표시용 UI 로그 옵저버 (질문 코드엔 없지만, 화면에 로그를 보여주기 위한 보조 옵저버)
class UILogger implements Observer {
  constructor(private push: (msg: string) => void) {}
  update(price: number): void {
    this.push(`UI 표시: 현재 주가 = ${price}`);
  }
}
const logs = ref<string[]>([]);
const uiLogger = new UILogger((msg) => {
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`);
  if (logs.value.length > 100) logs.value.pop();
});

// 체크박스로 옵저버 등록/해제
const useDisplay = ref(true);
const useAlert = ref(true);

// 초기에 UI 로거는 항상 등록 (화면에서 변화 확인용)
stock.register(uiLogger);

// 초기 상태에 맞춰 등록
if (useDisplay.value) stock.register(display);
if (useAlert.value) stock.register(alertObs);

// 체크박스가 바뀌면 등록/해제
watch(useDisplay, (on) => {
  on ? stock.register(display) : stock.unregister(display);
});
watch(useAlert, (on) => {
  on ? stock.register(alertObs) : stock.unregister(alertObs);
});

// 가격 변경
const price = ref<number>(90);
function applyPrice() {
  stock.setPrice(price.value); // 내부에서 notify() 호출
}
</script>

<template>
  <main class="wrap">
    <h1>Observer 패턴 데모</h1>

    <section class="controls">
      <div class="row">
        <label><input type="checkbox" v-model="useDisplay" /> PriceDisplay 구독</label>
        <label><input type="checkbox" v-model="useAlert" /> PriceAlert 구독</label>
      </div>

      <div class="row">
        <label>주가</label>
        <input type="number" v-model.number="price" min="0" step="1" />
        <button @click="applyPrice">가격 반영</button>
      </div>
      <p class="hint">브라우저 콘솔에도 로그가 출력됩니다.</p>
    </section>

    <section class="logs">
      <h3>UI 로그</h3>
      <ul>
        <li v-for="(line, i) in logs" :key="i">{{ line }}</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.wrap { max-width: 760px; margin: 40px auto; padding: 0 16px; }
.controls { margin-bottom: 16px; }
.row { display: flex; gap: 12px; align-items: center; margin: 10px 0; }
input[type="number"] {
  width: 160px; padding: 6px 8px; border: 1px solid #555; border-radius: 8px;
  background: #111; color: #eee;
}
button {
  padding: 8px 14px; border: 1px solid #555; border-radius: 10px;
  background: #1c1c1c; cursor: pointer;
}
.logs ul { list-style: none; padding-left: 0; }
.logs li { padding: 6px 0; border-bottom: 1px dashed #444; }
.hint { opacity: 0.8; }
</style>
