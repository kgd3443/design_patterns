class CPU {
    private started = false;

    startSequence(): string {
        this.started = true;
        return "CPU: 부팅 시퀀스 시작";
    }

    halt(): string {
        this.started = false;
        return "CPU: 정지";
    }

    isStarted(): boolean {
        return this.started; // ← 읽어서 사용
    }
}

class Memory {
    load(): string { return "Memory: 커널/드라이버 로드"; }
    clear(): string { return "Memory: 메모리 정리"; }
}
class Disk {
    spinUp(): string { return "Disk: 스핀업"; }
    spinDown(): string { return "Disk: 스핀다운"; }
    readBoot(): string { return "Disk: 부트 섹터 읽기"; }
}

export class ComputerFacade {
    private cpu = new CPU();
    private mem = new Memory();
    private disk = new Disk();

    start(): string[] {
        if (this.cpu.isStarted()) {
            return ["시스템: 이미 켜져 있습니다"]; // started를 실제로 활용
        }
        return [
            this.disk.spinUp(),
            this.cpu.startSequence(),
            this.disk.readBoot(),
            this.mem.load(),
            "OS: 로그인 화면 표시",
        ];
    }

    shutdown(): string[] {
        if (!this.cpu.isStarted()) {
            return ["시스템: 이미 꺼져 있습니다"]; // 상태 분기
        }
        return [
            "OS: 셧다운 요청",
            this.mem.clear(),
            this.disk.spinDown(),
            this.cpu.halt(),
            "전원 차단",
        ];
    }
}
