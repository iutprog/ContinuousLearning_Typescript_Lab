export {};

// DECLARATION MERGING
// TypeScript can combine multiple declarations with the same name into one.
// Interfaces are commonly used this way, including when a library's types need
// to be extended without editing the library itself.
//
// Why use it? Add related properties to an existing interface in a separate
// file, for example when extending shared or third-party types.
//
// Mental model: two interface descriptions with the same name are two pieces
// of one puzzle. TypeScript joins their properties into one complete shape.

// LessonUser is declared in two .d.ts files. Its merged type has both `name`
// and `role`, even though neither declaration lists both properties.
const lessonUser: LessonUser = {
	name: "Ada",
	role: "Administrator",
};

console.log(`${lessonUser.name}: ${lessonUser.role}`);

// This would fail because both merged properties are required:
// const incompleteUser: LessonUser = { name: "Ada" };