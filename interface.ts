interface User {
    name: string;
    email: string;
    age: number;
    nickname?: string;
}

let usr: User = {name: "Abel", email: "", age: 27};

interface Employee extends User {
    id: string;
}

let emp: Employee = {name: "Abel", email: "", age: 27, id: "123"};

export interface Login {
    Login(email: string, password: string): boolean;
}

// Interfaces exist only for the type checker. tsc erases them and emits no JavaScript for them.
// A class is different: it stays in the output because it has runtime behavior.
