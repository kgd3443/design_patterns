<script setup lang="ts">
import { ref } from "vue";
import {
  BaseNotifier,
  EmailNotifier,
  SMSNotifier,
  SlackNotifier,
} from "./patterns/decorator";

const message = ref("긴급 서버 장애 발생!");
const useEmail = ref(true);
const useSMS = ref(true);
const useSlack = ref(true);

function buildNotifier(): Notifier {
  let notifier: Notifier = new BaseNotifier();
  if (useEmail.value) notifier = new EmailNotifier(notifier);
  if (useSMS.value)   notifier = new SMSNotifier(notifier);
  if (useSlack.value) notifier = new SlackNotifier(notifier);
  return notifier;
}

function sendNow() {
  const notifier = buildNotifier();
  notifier.send(message.value);
  // 콘솔 예시:
  // 기본 알림: 긴급 서버 장애 발생!
  // 이메일 발송: 긴급 서버 장애 발생!
  // SMS 발송: 긴급 서버 장애 발생!
  // Slack 발송: 긴급 서버 장애 발생!
}
</script>

<template>
  <main class="wrap">
    <h1>Decorator 패턴 데모</h1>

    <label class="row">
      <span>메시지</span>
      <input v-model="message" placeholder="알림 메시지" />
    </label>

    <div class="row checks">
      <label><input type="checkbox" v-model="useEmail" /> Email</label>
      <label><input type="checkbox" v-model="useSMS" /> SMS</label>
      <label><input type="checkbox" v-model="useSlack" /> Slack</label>
    </div>

    <button @click="sendNow">알림 보내기</button>
  </main>
</template>

<style scoped>
.wrap { max-width: 720px; margin: 40px auto; padding: 0 16px; }
.row { display: flex; gap: 12px; align-items: center; margin: 12px 0; }
.checks label { display: inline-flex; align-items: center; gap: 6px; }
input[type="text"], input:not([type]) {
  flex: 1; padding: 8px 10px; border-radius: 8px; border: 1px solid #555;
  background: #111; color: #eee;
}
button {
  padding: 8px 14px; border-radius: 10px; border: 1px solid #555;
  background: #1c1c1c; cursor: pointer;
}
.hint { opacity: 0.8; margin-top: 8px; }
</style>
