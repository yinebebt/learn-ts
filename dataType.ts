// Primitives & Numbers
const developerName: string = "Abel";
const upperName = developerName.toUpperCase();
console.log(upperName);

const age: number = 27;
const ageString = "27";
const numericAge = parseInt(ageString, 10);
console.log(numericAge);

// Arrays
const empList: string[] = ["John", "Jane", "Jack"];
const numbers: readonly number[] =[1,2,3,4]; // immutable array

const oddNumbers = numbers.filter(num => num % 2 !== 0);
const incrementedOdds = oddNumbers.map(num => num + 1);
console.log(incrementedOdds);

const foundEmp = empList.find(emp => emp === "Jane");
const totalSum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(totalSum);

// Enums vs Literal Unions
enum Color { Red, Green, Blue }
const activeColor: Color = Color.Red;

type StrictColor = "Red" | "Green" | "Blue";
const explicitColor: StrictColor = "Green";

// Advanced Types
const employeeRole: [number, string] = [1, "Manager"]; // tuple

let unpredictableData: any = "Hello";
unpredictableData = 42;

let safeUnpredictableData: unknown = "Hello";
if (typeof safeUnpredictableData === "string") {
    console.log(safeUnpredictableData.toUpperCase());
}

const missingData: null = null;
const uninitializedData: undefined = undefined;
let userId: string | null = null;

function terminateSystem(message: string): never {
    throw new Error(message);
}