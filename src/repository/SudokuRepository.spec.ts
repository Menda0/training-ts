import {SudokuRepository} from './SudokuRepository'

const testSource = [['004300209005009001070060043006002087190007400050083000600000105003508690042910300', '004300209005009001070060043006002087190007400050083000600000105003508690042910300']]


describe('Testing Sudoku Repository', () => {
    it('Test if repository can get sudokus from csv', async () => {
        const loadCSV = jest
            .spyOn(SudokuRepository.prototype as any, 'loadCsv')
            .mockImplementation(jest.fn().mockResolvedValue(testSource));

        const repository = new SudokuRepository('test')
        const sudokus = await repository.load()
        expect(sudokus).not.toBeNull()
        expect(sudokus.length).toEqual(1)
        expect(loadCSV).toBeCalledTimes(1)
    });
})

