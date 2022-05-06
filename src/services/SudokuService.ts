import {Sudoku} from "../model/Sudoku";
import {SudokuRepository} from "../repository/SudokuRepository";

export interface ISudokuService{
    loadSudokus: () => Promise<void>
    startSudoku: (index: number) => void
    checkSudokuComplete: () => boolean
    setValue: (row:number, column:number, value:number) => void
    render: () => void
}

export class SudokuService implements ISudokuService{
    currentSudoku: Sudoku
    listSudokus: Array<Sudoku>
    repository: SudokuRepository

    constructor() {
        this.repository = new SudokuRepository('resources/sudoku2.csv');
    }

    checkSudokuComplete(): boolean {
        const solved = this.currentSudoku.checkSolved();
        if(solved){
            console.log('Sudoku solved')
        }else{
            console.log('Not solved')
        }
        return solved
    }

    async loadSudokus(): Promise<void> {
        console.log('Getting sudokus from database')
        this.listSudokus = await this.repository.load()
        console.log(`Loaded ${this.listSudokus.length} sudokus ...`)
    }

    setValue(row: number, column: number, value: number): void {
        this.currentSudoku.setValue(row, column, value)
        console.log(`Set value:${value} row:${row} column:${column}`)
    }

    startSudoku(index: number): void {
        this.currentSudoku = this.listSudokus[index]
        console.log(`Start sudoku in index ${index}`)
    }

    render(){
        this.currentSudoku.render()
    }
}
