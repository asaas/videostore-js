function statement (customer, movies) {
  let result = 'Rental Record for ' + customer.name + '\n'

  for (let r of customer.rentals) {
    result += '\t' + movieFor(r, movies).title + '\t' + amountFor(r, movies) + '\n'
  }

  result += 'Amount owed is ' + totalAmount(customer.rentals, movies) + '\n'
  result += 'You earned ' + totalFrequentRenterPoints(customer.rentals, movies) + ' frequent renter points\n';

  return result;
}

function movieFor(rental, movies) {
  return movies[rental.movieID]
}

function amountFor(rental, movies) {
  let thisAmount = 0;

  switch (movieFor(rental, movies).code) {
    case 'regular':
      thisAmount = 2;
      if (rental.days > 2) {
        thisAmount += (rental.days - 2) * 1.5;
      }
      break;
    case 'new':
      thisAmount = rental.days * 3;
      break;
    case 'childrens':
      thisAmount = 1.5;
      if (rental.days > 3) {
        thisAmount += (rental.days - 3) * 1.5;
      }
      break;
  }

  return thisAmount;
}

function totalAmount(rentals, movies) {
  let totalAmount = 0;

  for (let r of rentals) {
    totalAmount += amountFor(r, movies);
  }

  return totalAmount;
}

function frequentRenterPointsFor(rental, movies) {
  let frequentRenterPoints = 0;

  frequentRenterPoints++;
  if(movieFor(rental, movies).code === 'new' && rental.days > 2) frequentRenterPoints++;

  return frequentRenterPoints;
}

function totalFrequentRenterPoints(rentals, movies) {
  let frequentRenterPoints = 0;

  for (let r of rentals) {

    frequentRenterPoints += frequentRenterPointsFor(r, movies)
  }

  return frequentRenterPoints;
}

module.exports = {
  statement
}
