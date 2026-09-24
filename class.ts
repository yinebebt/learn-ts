class Person {
    Name: string;
    #Age: number;

    constructor(name: string, age: number) {
        this.Name = name;
        this.#Age = age;
    }

    getAddress(): string {
        return this.Name + " lives in New York";
    }

    static getCount(): number {
        return 10;
    }

    get age(): number {
        return this.#Age;
    }

    set age(value: number) {
        this.#Age = value;
    }
}

let abel = new Person("Abel", 27);
console.log(abel.getAddress());

class Employee extends Person {
    Department: string;

    constructor(name: string, age: number, department: string) {
        super(name, age);
        this.Department = department;
    }
}

let john = new Employee("John", 30, "Sales");

john.age = 31;
console.log(john.age);

console.log(john.getAddress());

console.log(Employee.getCount());
