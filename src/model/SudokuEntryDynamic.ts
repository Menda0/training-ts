import {EntryType, ISudokuEntry, SudokuEntry} from "./SudokuEntry";

export class SudokuEntryDynamic extends SudokuEntry implements ISudokuEntry{
    constructor(index: number, value: number=-1) {
        super(index, value, EntryType.Dynamic);
    }
}
