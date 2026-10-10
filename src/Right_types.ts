
export {};
//Think of these as tools for describing types from existing things, plus one tool for cleanup:
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


// `typeof` in a type position: derive a type from an existing value.
// Why use it? The type stays aligned with the value without repeating its shape.
// Mental model: value first, type copied from it.
const defaultContact = { id: 1, name: "Ada" };
type DefaultContact = typeof defaultContact;

// Indexed access: look up the type stored under a key.
// Why use it? Reuse one property's type without manually declaring it again.
// Mental model: type-level object["property"] lookup.
type ContactName = Contact["name"]; // string

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
 
