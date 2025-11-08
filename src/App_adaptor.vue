<script setup lang="ts">
import { NewPaymentGateway, PaymentAdapter, processPayment } from "./patterns/adapter";

const gw = new NewPaymentGateway();
const adapter = new PaymentAdapter(gw);

function pay5k()  { processPayment(adapter, 5000); }
function pay10k() { processPayment(adapter, 10000); }
</script>

<template>
  <main>
    <h1>Adapter 패턴 데모</h1>
    <button @click="pay5k">5,000원 결제</button>
    <button @click="pay10k">10,000원 결제</button>
  </main>
</template>

<style scoped>
main { max-width: 720px; margin: 40px auto; padding: 0 16px; }
button { margin-right: 8px; }
</style>
<script setup lang="ts">
</script>