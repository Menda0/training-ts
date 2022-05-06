import {EntryType, SudokuEntry} from "./SudokuEntry";
import {SudokuEntryStatic} from "./SudokuEntryStatic";
import {SudokuEntryDynamic} from "./SudokuEntryDynamic";

export class Sudoku {

    puzzle: Array<SudokuEntry>
    solution: string

    constructor(source: string, solution: string) {
        this.init(source)
    }

    private init(source: string) {
        const puzzle = []
        for (let i = 0; i < source.length; i++) {

            let entry: SudokuEntry
            const value = parseInt(source[i])

            if (value > 0) {
                entry = new SudokuEntryStatic(i, value)
            } else {
                entry = new SudokuEntryDynamic(i)
            }
            puzzle.push(entry)
        }

        this.puzzle = puzzle
    }

    public checkSolved(): boolean {
        const source = this.puzzle.reduce<string>((acc, curr) => acc + curr.value, '')
        return source === this.solution
    }

    public setValue(row: number, column: number, value: number) {
        const size = 9
        const index = column * size + row

        this.puzzle[index].setValue(value)
    }

    public render(): void {
        let grid = `
          0   1   2   3   4   5   6   7   8
        ╔═══╤═══╤═══╦═══╤═══╤═══╦═══╤═══╤═══╗
      0 ║ _ │ _ │ _ ║ _ │ _ │ _ ║ _ │ _ │ _ ║
        ╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
      1 ║ _ │ _ │ _ ║ _ │ _ │ _ ║ _ │ _ │ _ ║
        ╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
      2 ║ _ │ _ │ _ ║ _ │ _ │ _ ║ _ │ _ │ _ ║
        ╠═══╪═══╪═══╬═══╪═══╪═══╬═══╪═══╪═══╣
      3 ║ _ │ _ │ _ ║ _ │ _ │ _ ║ _ │ _ │ _ ║
        ╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
      4 ║ _ │ _ │ _ ║ _ │ _ │ _ ║ _ │ _ │ _ ║
        ╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
      5 ║ _ │ _ │ _ ║ _ │ _ │ _ ║ _ │ _ │ _ ║
        ╠═══╪═══╪═══╬═══╪═══╪═══╬═══╪═══╪═══╣
      6 ║ _ │ _ │ _ ║ _ │ _ │ _ ║ _ │ _ │ _ ║
        ╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
      7 ║ _ │ _ │ _ ║ _ │ _ │ _ ║ _ │ _ │ _ ║
        ╟───┼───┼───╫───┼───┼───╫───┼───┼───╢
      8 ║ _ │ _ │ _ ║ _ │ _ │ _ ║ _ │ _ │ _ ║
        ╚═══╧═══╧═══╩═══╧═══╧═══╩═══╧═══╧═══╝
        `

        for (const entry of this.puzzle) {
            switch (entry.type) {
                case EntryType.Static:
                    const char = `\x1b[34m${entry.value}\x1b[0m`
                    grid = grid.replace('_', char)
                    break
                case EntryType.Dynamic:
                    if (entry.value > 0) {
                        const char = `\x1b[32m${entry.value}\x1b[0m`
                        grid = grid.replace('_', char)
                    } else {
                        grid = grid.replace('_', ' ')
                    }
                    break
            }
        }

        console.log(grid)
    }

}
