import Person from './modules/Person';

class Adult extends Person {
  payTaxes() {
    console.log('Taxes paid!');
  }
}

var john = new Adult("John Smith", "blue");
john.greet();