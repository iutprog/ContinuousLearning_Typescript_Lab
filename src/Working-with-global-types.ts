export {};  //  forces this file to be treated as a module, so its declarations stay scoped to the file

// GLOBAL TYPES WITH AMBIENT DECLARATIONS
// A .d.ts file describes types that exist elsewhere; it does not create runtime code.
//
// Why use them? Share common type descriptions without repeating them in each
// file, or teach TypeScript about a JavaScript library that has no type definitions.
//
// Mental model: a .d.ts file is a label or map for existing code. It tells the
// compiler what shape to expect; it does not create the described value.

// GlobalContact comes from Global-types.d.ts and needs no import because it is
// declared globally. This object is a real value created here.
const globalContact: GlobalContact = { id: 1, name: "Ada" };
console.log(globalContact.name);

// A `declare module` describes an external package's exports. Import those types
// from the package name. The type-only import is erased from emitted JavaScript.
import type { LegacyContact } from "legacy-contact-library";

const exampleLegacyContact: LegacyContact = { id: 2, name: "Grace" };
console.log(exampleLegacyContact.name);

// Remember the difference:
// - Global ambient declaration: use the type directly, without importing it.
// - Ambient module declaration: use `import` from the declared module name.