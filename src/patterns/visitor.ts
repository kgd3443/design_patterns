// Visitor 인터페이스
interface Visitor {
    visitFile(file: FileElement): void
    visitFolder(folder: FolderElement): void
}

// Element 인터페이스
interface Element {
    accept(visitor: Visitor): void
}

class FileElement implements Element {
    public name: string;
    public size: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }

    accept(visitor: Visitor): void {
        visitor.visitFile(this);
    }
}

class FolderElement implements Element {
    public name: string;
    public children: Element[];

    constructor(name: string, children: Element[] = []) {
        this.name = name;
        this.children = children;
    }

    accept(visitor: Visitor): void {
        visitor.visitFolder(this);
    }
}


// 파일 크기를 계산하는 Visitor
class SizeCalculator implements Visitor {
    private totalSize = 0
    visitFile(file: FileElement): void { this.totalSize += file.size }
    visitFolder(folder: FolderElement): void { folder.children.forEach(c => c.accept(this)) }
    getTotalSize(): number { return this.totalSize }
}

// 이름을 출력하는 Visitor
class NamePrinter implements Visitor {
    visitFile(file: FileElement): void { console.log(`파일: ${file.name}`) }
    visitFolder(folder: FolderElement): void {
        console.log(`폴더: ${folder.name}`)
        folder.children.forEach(c => c.accept(this))
    }
}

export {  FileElement, FolderElement, SizeCalculator, NamePrinter }
