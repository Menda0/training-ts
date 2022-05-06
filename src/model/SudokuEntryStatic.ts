import {EntryType, ISudokuEntry, SudokuEntry} from "./SudokuEntry";

export class InvalidMoveException extends Error{
    constructor() {
        super('This position cannot be changed');
    }
}

export class SudokuEntryStatic extends SudokuEntry implements ISudokuEntry{
    constructor(index: number,value: number) {
        super(index, value, EntryType.Static);
    }

    setValue(value: number) {
        throw new InvalidMoveException()
    }
}
