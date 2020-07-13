function statement (customer, movies) {
  return header(customer.name) +
    rentalLines(customer.rentals, movies) +
    footer(customer.rentals, movies);
}

function header(name) {
  return `Rental Record for ${name}\n`;
}

function rentalLines(rantals, movies) {
  return rantals.map(r => rentalLine(r, movies)).join('');
}

function footer(rentals, movies) {
  return `Amount owed is ${totalAmount(rentals, movies)}\n` +
    `You earned ${totalFrequentRenterPoints(rentals, movies)} frequent renter points\n`;
}

function rentalLine(rental, movies) {
  return `\t${movieFor(rental, movies).title}\t${amountFor(rental, movies)}\n`
}

function movieFor(rental, movies) {
  return movies[rental.movieID];
}

function amountFor(rental, movies) {
  switch (movieFor(rental, movies).code) {
    case 'regular': {
      const baseAmount = 2;
      return rental.days > 2 ? baseAmount + (rental.days - 2) * 1.5
        : baseAmount;
    }
    case 'new': {
      return rental.days * 3;
    }
    case 'childrens': {
      const baseAmount = 1.5;
      return rental.days > 3 ? baseAmount + (rental.days - 3) * 1.5
        : baseAmount;
    }
  }
}

function totalAmount(rentals, movies) {
  return rentals
    .map(r => amountFor(r, movies))
    .reduce((acc, cur) => acc + cur, 0);
}

function frequentRenterPointsFor(rental, movies) {
  const baseRenterPoints = 1;

  return movieFor(rental, movies).code === 'new' && rental.days > 2 ? baseRenterPoints + 1
    : baseRenterPoints;
}

function totalFrequentRenterPoints(rentals, movies) {
  return rentals
    .map(r => frequentRenterPointsFor(r, movies))
    .reduce((acc, cur) => acc + cur, 0);
}

module.exports = {
  statement
}
