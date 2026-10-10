
export {};
//Think of these as tools for describing types from existing things, plus one tool for cleanup:
//TERMS : keyof, typeof, indexed access, Record, using, Partial, Pick, Required, Omit, Mapped types

//============== TERM#01 : keyof =========================
// `keyof`: ask an object type which property names are allowed.
// Why use it? It prevents typos when a function accepts a property name.
// Mental model: keyof = the keys of this shape.
type Contact = { id: number; name: string };
type ContactKey = keyof Contact; // "id" | "name"

function getContactValue(contact: Contact, key: keyof Contact) {
  return contact[key];
}

getContactValue({ id: 1, name: "Ada" }, "name"); // OK
// getContactValue({ id: 1, name: "Ada" }, "email"); // Type error

//============== TERM#02 : typeof =========================

// `typeof` in a type position: derive a type from an existing value.
// Why use it? The type stays aligned with the value without repeating its shape.
// Mental model: value first, type copied from it.
const defaultContact = { id: 1, name: "Ada" };
type DefaultContact = typeof defaultContact;

//============== TERM#03 : indexed access types =========================
// Indexed access: look up the type stored under a key.
// Why use it? Reuse one property's type without manually declaring it again.
// Mental model: type-level object["property"] lookup.
type ContactName = Contact["name"]; // string

//============== TERM#04 : Record =========================
// `Record`: make an object with a limited set of keys and one value type.
// Why use it? It ensures required keys exist and every value has the right type.
// Mental model: a dictionary with rules for its keys and values.
type Scores = Record<"math" | "science", number>;
const scores: Scores = { math: 90, science: 85 };
// if i get well for Record<V,T> ,  V is the value of the key and T is the type of the value. 
// So in this case V is "math" | "science" and T is number. 
// So the scores object must have keys "math" and "science" and their values must be numbers.
// anther example of Record is
type ContactScores = Record<keyof Contact, number>;
const contactScores: ContactScores = { id: 1, name: 90 }; // OK
// const contactScores2: ContactScores = { id: 1, name: "A" }; // Type error

//============== TERM#05 : using =========================
// `using`: automatically calls Symbol.dispose when the current scope ends.
// When to use it: for resources that need cleanup, such as files or connections,
// and whose objects implement Disposable. Cleanup also happens on early return
// or when an error is thrown, so you do not have to remember a manual finally block.
// Mental model: borrow a resource for this block; TypeScript closes it at the block's end.
class TemporaryResource implements Disposable {
	[Symbol.dispose](): void {
		console.log("Close the resource");
	}
}

function readWithTemporaryResource(): void {
	using resource = new TemporaryResource(); // starts managed lifetime
	console.log("Use the resource");
	if (true) return; // disposal still runs before leaving this function
}

// Output: "Use the resource", then "Close the resource".
readWithTemporaryResource();


// Another example: a log file object owns a resource and knows how to close it.
class LogFile implements Disposable {
	write(message: string): void {
		console.log(`Writing to log: ${message}`);
	}

	[Symbol.dispose](): void {
		console.log("Log file closed");
	}
}

function saveLog(): void {
	using logFile = new LogFile();
	logFile.write("Application started");
}

// The log file is closed automatically when saveLog exits.
saveLog();
 
//============== TERM#06 : Partial =========================
// Partial types: make a type with all properties optional.
// Why use it? It allows you to create objects that only specify some properties.
// Mental model: a type with the same shape, but everything is optional.
type PartialContact = Partial<Contact>;
const partialContact: PartialContact = { name: "Ada" }; // OK, id is optional	
// const invalidPartialContact: PartialContact = { id: "1" }; // Error: id must be a number when provided.


//============== TERM#07 : Pick =========================
//Pick types: make a type with only some properties from another type.
// Why use it? It allows you to create objects that only specify some properties.
// Mental model: a type with the same shape, but only the selected properties.
type PickContact = Pick<Contact, "id">;
const pickContact: PickContact = { id: 1 }; // OK, name is not required
// const invalidPickContact: PickContact = { name: "Ada" }; // Error: name is not allowed.	

//============== TERM#08 : Required =========================
// Required types: make a type with all properties required.
// Why use it? It allows you to create objects that must specify all properties.
// Mental model: a type with the same shape, but everything is required.
type RequiredContact = Required<PartialContact>;
const requiredContact: RequiredContact = { id: 1, name: "Ada" }; // OK, both id and name are required
// const invalidRequiredContact: RequiredContact = { id: 1 }; // Error: name is required.

//============== TERM#09 : Omit =========================
// Omit types: make a type with some properties omitted.
// Why use it? It allows you to create objects that do not specify some properties.
// Mental model: a type with the same shape, but without the omitted properties.
type OmitContact = Omit<Contact, "id">;
const omitContact: OmitContact = { name: "Ada" }; // OK, id is omitted
// const invalidOmitContact: OmitContact = { id: 1 }; // Error: id is not allowed.


//============== TERM#10 : Mapped types =========================
//Mapped types: create a new type by transforming each property of an existing type.
// Why use it? It allows you to create new types based on existing types with some modifications.
// Mental model: a type that is derived from another type by applying a transformation to each property.	

// Map every property in T to an optional property with the same value type.
type OptionalProperties<T> = {
	[Property in keyof T]?: T[Property];
};

type OptionalContact = OptionalProperties<Contact>;
const optionalContact: OptionalContact = { name: "Ada" }; // OK: id can be left out
// const invalidOptionalContact: OptionalContact = { id: "1" }; // Error: id must still be a number.

// Map every property in T to a boolean, for example to track which fields are selected.
type SelectionFlags<T> = {
	[Property in keyof T]: boolean;
};

type ContactSelection = SelectionFlags<Contact>;
const contactSelection: ContactSelection = { id: true, name: false }; // Both original keys are required.
