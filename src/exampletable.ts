import {prompt, registerPrompt} from 'inquirer'

import {parse} from 'csv-parse'

import {createReadStream} from 'fs'

const path = 'resources/sudoku.csv'


const csvData: any = [];
createReadStream(path)
    .pipe(parse({delimiter: ','}))
    .on('data', function (csvrow) {
        //do something with csvrow
        csvData.push(csvrow);
    })
    .on('end', function () {
        //do something with csvData
        const sudoku1 = csvData[1][0]
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

        for(let i=0; i<sudoku1.length;i++){
            let char = ''
            const value = sudoku1[i]
            if(parseInt(value) > 0){
                char = `\x1b[34m${value}\x1b[0m`
            }else{
                char = ' '
            }
            grid = grid.replace('_', char)
        }

        console.log(grid)
    });

const getLine = (line: number, source:string) => {
    const size = 9
    let start = line * size
    let end = line * size + size

    const result: Array<String> = []

    for(let i=start;i<end;i++){
        result.push(source[i])
    }

    return result
}



