
//Interface is a way to define the structure of an object in TypeScript. 
//It is available in TypeScript but not in JavaScript.
//It is availabe at compile time and not at runtime.
interface Contact extends Address {
    id: number ;
    name: ContactName;
    birthDate?: Date;  //The question mark indicates that the property is optional.
    status: ContactStatus;  

}

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

enum ContactStatus {
    Active = "active",
    Inactive = "inactive",
    New = "new"
}

let primaryContact1: Contact = {
    id: 1,
    name: "John Doe",
    birthDate: new Date("1990-01-01"),
    status: ContactStatus.Active,
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345"
};

let secondaryContact1: Contact = {
    id: 2,
    name: "Jane Smith",
    status: ContactStatus.Inactive,
    street: "456 Oak Ave",
    city: "Somewhere",
    state: "NY",
    zip: "67890"
};

//defining types using type alias
type ContactName= string;

