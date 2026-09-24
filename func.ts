// function definition

function add(a: number, b: number, c?: number): number {
    return c ? a + b + c : a + b;
}
console.log(add(1, 2));

// arrow function
let sub = (num1: number, num2: number, num3 = 4): number => num1 - num2 - num3;
console.log(sub(10, 2));

// generics
function createArray<T>(length: number, value: T): T[] {
    const result: T[] = [];
    for (let i = 0; i < length; i++) {
        result.push(value);
    }
    return result;
}

let numbersArray = createArray<number>(5, 42);
let stringsArray = createArray<string>(3, "Hello");

console.log(numbersArray, stringsArray);
