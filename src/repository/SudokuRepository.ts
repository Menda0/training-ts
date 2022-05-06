import {Sudoku} from "../model/Sudoku";
import {createReadStream} from "fs";
import {parse} from "csv-parse";

interface ISudokuRepository {
    load: () => Promise<Array<Sudoku>>
}

export class SudokuRepository implements ISudokuRepository {

    source: string

    constructor(source: string) {
        this.source = source
    }

    public async load(): Promise<Array<Sudoku>> {
        const sources = await this.loadCsv()
        const sudokus = []

        for(const source of sources){
            const sudoku = new Sudoku(source[0], source[1])
            sudokus.push(sudoku)
        }

        return sudokus
    }

    private loadCsv(): Promise<Array<Array<string>>> {
        return new Promise((resolve, reject) => {
            const sources:Array<Array<string>> = []

            createReadStream(this.source)
                .pipe(parse({delimiter: ','}))
                .on('data', function (csvrow) {
                    sources.push([csvrow[0], csvrow[1]])
                })
                .on('end', function () {
                    resolve(sources)
                })
        })
    }
}
