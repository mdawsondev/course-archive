var Person = function(pName, pColor) {
  this.name = pName;
  this.color = pColor;
  this.greet = function() {
    console.log("I'm " + this.name + ", and I love " + pColor + ".")
  }
}

module.exports = Person;