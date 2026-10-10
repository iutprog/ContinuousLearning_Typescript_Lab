// Ambient global declaration: available to TypeScript files without importing it.
interface GlobalContact {
	id: number;
	name: string;
}

// Ambient module declaration: describes the types exported by an external
// JavaScript package that does not provide its own TypeScript declarations.
declare module "legacy-contact-library" {
	export interface LegacyContact {
		id: number;
		name: string;
	}

	export function findContact(id: number): LegacyContact | undefined;
}