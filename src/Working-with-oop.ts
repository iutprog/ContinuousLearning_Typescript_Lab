export {};

// OBJECT-ORIENTED PROGRAMMING (OOP)
// OOP groups data and the actions that work on that data into objects.
// Mental model: a class is a blueprint; an object is one thing built from it.

// 1. Class, object, constructor, and method
class OopPerson {
  constructor(
    public name: string,
    private age: number,
  ) {}

  introduce(): string {
    return `Hi, I'm ${this.name}.`;
  }

  getAge(): number {
    return this.age;
  }
}

const person = new OopPerson("Ada", 36); // object (instance) made from the class
console.log(person.introduce()); // "Hi, I'm Ada."
console.log(person.getAge()); // 36
// `private age` can only be accessed inside OopPerson, so use getAge().

// 2. Inheritance and overriding
// A child class reuses a parent class and can specialize its behavior.
class OopEmployee extends OopPerson {
  constructor(name: string, age: number, public jobTitle: string) {
    super(name, age); // initialize the parent part
  }

  override introduce(): string {
    return `${super.introduce()} My role is ${this.jobTitle}.`;
  }
}

const employee = new OopEmployee("Grace", 30, "engineer");
console.log(employee.introduce());
// "Hi, I'm Grace. My role is engineer."

// Quick recap:
// - class: blueprint; object: instance created with `new`
// - constructor: sets up an instance
// - method: action the object can perform
// - private: keeps a member accessible only inside its class
// - extends / override: reuse a class and specialize a method
