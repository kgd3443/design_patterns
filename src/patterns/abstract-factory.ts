// ===== Abstract Factory =====
export interface Button { render(): string; }
export interface Checkbox { render(): string; }

export interface UIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
}

// Windows 군
class WindowsButton implements Button { render() { return "Windows 버튼 렌더링"; } }
class WindowsCheckbox implements Checkbox { render() { return "Windows 체크박스 렌더링"; } }
export class WindowsFactory implements UIFactory {
    createButton() { return new WindowsButton(); }
    createCheckbox() { return new WindowsCheckbox(); }
}

// Mac 군
class MacButton implements Button { render() { return "Mac 버튼 렌더링"; } }
class MacCheckbox implements Checkbox { render() { return "Mac 체크박스 렌더링"; } }
export class MacFactory implements UIFactory {
    createButton() { return new MacButton(); }
    createCheckbox() { return new MacCheckbox(); }
}

// 클라이언트 헬퍼
export function buildUI(factory: UIFactory): string[] {
    const views: string[] = [];
    views.push(factory.createButton().render());
    views.push(factory.createCheckbox().render());
    return views;
}
