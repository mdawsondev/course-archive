class Person {
  constructor(fullName, favColor) {
    this.name = fullName;
    this.color = favColor;
  }
  greet() {
    console.log("Howdy partner, I'm " + this.name + ", and I love " + this.color + ".")
  }
}

export default Person;