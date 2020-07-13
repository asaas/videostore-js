const { statement } = require('./videostore');

const movies = {
  'F001': {title: 'The Cell', code: 'new'},
  'F002': {title: 'CUBE', code: 'new'},
  'F003': {title: 'The Tigger Movie', code: 'childrens'},
  'F004': {title: 'Plan 9 from Outer Space', code: 'regular'},
  'F005': {title: '8 1/2', code: 'regular'},
  'F006': {title: 'Eraserhead', code: 'regular'},
};

describe('statement', function() {
  it('should return single new release statement', function() {
    const martin = {
      name: 'martin',
      rentals: [
        {movieID: 'F001', days: 3},
      ]
    };

    expect(statement(martin, movies)).toBe('Rental Record for martin\n\tThe Cell\t9\nAmount owed is 9\nYou earned 2 frequent renter points\n')
  })

  it('should return dual new release statement', function() {
    const martin = {
      name: 'martin',
      rentals: [
        {movieID: 'F001', days: 3},
        {movieID: 'F002', days: 3},
      ]
    };

    expect(statement(martin, movies)).toBe('Rental Record for martin\n\tThe Cell\t9\n\tCUBE\t9\nAmount owed is 18\nYou earned 4 frequent renter points\n')
  })

  it('should return single childrens statement', function() {
    const martin = {
      name: 'martin',
      rentals: [
        {movieID: 'F003', days: 3},
      ]
    };

    expect(statement(martin, movies)).toBe('Rental Record for martin\n\tThe Tigger Movie\t1.5\nAmount owed is 1.5\nYou earned 1 frequent renter points\n')
  })

  it('return multiple regular statement', function() {
    const martin = {
      name: 'martin',
      rentals: [
        {movieID: 'F004', days: 1},
        {movieID: 'F005', days: 2},
        {movieID: 'F006', days: 3},
      ]
    };

    expect(statement(martin, movies)).toBe('Rental Record for martin\n\tPlan 9 from Outer Space\t2\n\t8 1/2\t2\n\tEraserhead\t3.5\nAmount owed is 7.5\nYou earned 3 frequent renter points\n')
  })
})
