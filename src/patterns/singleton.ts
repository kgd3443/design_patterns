/** =========================
 *  A) 모듈 캐시 기반 싱글톤 (가장 단순)
 *  ========================= */
export class Service extends EventTarget {
    private _count = 0;

    ping() { return "pong"; }
    get count() { return this._count; }

    inc() {
        this._count++;
        this.dispatchEvent(new Event("change"));
    }

    reset() {
        this._count = 0;
        this.dispatchEvent(new Event("change"));
    }
}

/** HMR/테스트에서도 단일 인스턴스 유지(전역 캐시) */
const KEY = Symbol.for("app.service");
const g = globalThis as Record<symbol, Service | undefined>;
export const service = g[KEY] ??= new Service();


/** =========================
 *  B) 클래식 lazy 싱글톤 (정석 패턴)
 *  ========================= */
export class Singleton {
    private static _i: Singleton | null = null;
    private constructor() {}

    static getInstance(): Singleton {
        return (this._i ??= new Singleton());
    }

    sayHello() {
        console.log("lazy로 생성된 싱글톤입니다 👋");
    }
}
