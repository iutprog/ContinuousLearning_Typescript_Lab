// MODULES
// A module is a file that keeps its own declarations private unless they are
// explicitly exported. Other files can use exported items by importing them.
//
// Why use modules? Split a program into focused files, reuse code, and reduce
// accidental name conflicts between unrelated parts of the program.
//
// Mental model: each file is a private room. `export` opens a selected item
// for others to use; `import` brings that item into the current file.
// Remember: export makes it available; import brings it in.

// Import a named function and type from the neighboring module file.
import {
	createModuleGreeting,
	type ModuleGreetingOptions,
} from "./module-greetings";

const greetingOptions: ModuleGreetingOptions = { name: "Ada" };
console.log(createModuleGreeting(greetingOptions)); // "Hello, Ada!"

// The helper used inside createModuleGreeting is not exported, so this file
// cannot import it directly. Only exported items form the module's public API.
