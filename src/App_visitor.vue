<script setup lang="ts">
import { ref } from "vue";
import {
  FileElement, FolderElement, SizeCalculator, NamePrinter
} from "./patterns/visitor";

// 예시 파일시스템 구성 (질문 예제와 동일)
const file1 = new FileElement("a.txt", 10);
const file2 = new FileElement("b.txt", 20);
const folder = new FolderElement("docs", [file1, file2]); // root

// 화면 출력용 상태
const totalSize = ref<number | null>(null);
const printed = ref<string[]>([]);

// 총 크기 계산
function runSize() {
  const sizeVisitor = new SizeCalculator();
  folder.accept(sizeVisitor);
  totalSize.value = sizeVisitor.getTotalSize(); // 30
}

// 이름 출력(콘솔 + 화면 리스트)
function runNames() {
  printed.value = [];
  const printer = new class extends NamePrinter {
    // 화면에 함께 누적
    override visitFile(file: FileElement) {
      printed.value.push(`파일: ${file.name}`);
      super.visitFile(file);
    }
    override visitFolder(folder: FolderElement) {
      printed.value.push(`폴더: ${folder.name}`);
      super.visitFolder(folder);
    }
  }();
  folder.accept(printer);
}
</script>

<template>
  <main class="wrap">
    <h1>Visitor 패턴 데모</h1>

    <section class="controls">
      <button @click="runSize">총 크기 계산</button>
      <button @click="runNames">이름 출력</button>
    </section>

    <section v-if="totalSize !== null" class="result">
      <h3>총 크기</h3>
      <p>{{ totalSize }}</p>
    </section>

    <section class="result">
      <h3>이름 출력 (UI)</h3>
      <ul>
        <li v-for="(line, i) in printed" :key="i">{{ line }}</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.wrap { max-width: 760px; margin: 40px auto; padding: 0 16px; }
.controls { display: flex; gap: 10px; align-items: center; }
button { padding: 8px 14px; border: 1px solid #555; border-radius: 10px; background: #1c1c1c; cursor: pointer; }
.result { margin-top: 16px; }
.hint { opacity: 0.75; }
</style>
