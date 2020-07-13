function statement (customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = 'Rental Record for ' + customer.name + '\n'
  for (let r of customer.rentals) {
    let movie = movies[r.movieID];
    let thisAmount = 0;

    switch (movie.code) {
      case 'regular':
        thisAmount = 2;
        if (r.days > 2) {
          thisAmount += (r.days - 2) * 1.5;
        }
        break;
      case 'new':
        thisAmount = r.days * 3;
        break;
      case 'childrens':
        thisAmount = 1.5;
        if (r.days > 3) {
          thisAmount += (r.days - 3) * 1.5;
        }
        break;
    }

    frequentRenterPoints++;
    if(movie.code === 'new' && r.days > 2) frequentRenterPoints++;

    result += '\t' + movie.title + '\t' + thisAmount + '\n'
    totalAmount += thisAmount;
  }

  result += 'Amount owed is ' + totalAmount + '\n'
  result += 'You earned ' + frequentRenterPoints + ' frequent renter points\n';

  return result;
}

module.exports = {
  statement
}
