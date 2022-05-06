import {SudokuService} from "./services/SudokuService";
import * as inquirer from "inquirer";

const service = new SudokuService();

const addValue = () => {
    const questions = [
        {
            message: 'row',
            name: 'row',
            type: 'number'
        },
        {
            message: 'column',
            name: 'column',
            type: 'number'
        },
        {
            message: 'value',
            name: 'value',
            type: 'number'
        }
    ]

    inquirer.prompt(questions).then(answers => {
        service.setValue(answers.row, answers.column, answers.value)
        loadChoices()
    })
}

const startSudoku = () => {
    const questions = [
        {
            message: 'Start sudoku?',
            name: 'index',
            type: 'number'
        }
    ]

    inquirer.prompt(questions).then(answers => {
        service.startSudoku(answers.index)
        loadChoices()
    })
}

const loadChoices = () => {
    const questions = [
        {
            message: 'Choose an option',
            name: 'option',
            type:'list',
            choices: [
                'View',
                'Start Sudoku',
                'Add Value'
            ]
        }
    ]

    if(service.currentSudoku){
        service.render()
    }
    inquirer.prompt(questions).then((answers) => {
        switch (answers.option) {
            case 'View':
                loadChoices()
                break
            case 'Start Sudoku':
                startSudoku()
                break
            case 'Add Value':
                addValue()
                break
            default:
                loadChoices()
                break
        }
    })
}


service.loadSudokus().then(() => {
 loadChoices()
})
