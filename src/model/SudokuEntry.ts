export enum EntryType {
    Static,
    Dynamic
}

export interface ISudokuEntry {
    index:number
    value: number,
    type: EntryType,
    setValue: (value: number) => void
}

export class SudokuEntry implements ISudokuEntry {
    index: number;
    type: EntryType;
    value: number;

    constructor(index: number,value: number, type: EntryType) {
        this.index = index

        this.type = type
        this.value = value
    }

    setValue(value: number): void {
        this.value = value
    }
}
