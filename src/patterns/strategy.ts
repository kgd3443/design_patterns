export interface PricingStrategy {
    name(): string;
    price(base: number): number;
}

export class NoDiscount implements PricingStrategy {
    name() { return "할인 없음"; }
    price(base: number) { return base; }
}
export class Seasonal10 implements PricingStrategy {
    name() { return "시즌 10% 할인!"; }
    price(base: number) { return Math.round(base * 0.9); }
}
export class BlackFriday25 implements PricingStrategy {
    name() { return "블랙프라이데이 25% 할인!!"; }
    price(base: number) { return Math.round(base * 0.75); }
}
export class VIPMinus3000 implements PricingStrategy {
    name() { return "VIP -3000 할인!!!"; }
    price(base: number) { return Math.max(0, base - 3000); }
}

export function applyStrategy(base: number, s: PricingStrategy): number {
    return s.price(base);
}
