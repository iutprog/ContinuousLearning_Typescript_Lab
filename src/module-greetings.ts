// This file is a module because it exports declarations.

export interface ModuleGreetingOptions {
	name: string;
}

// This helper stays private to this file because it is not exported.
function cleanModuleName(name: string): string {
	return name.trim();
}

// Exported function: other files can import and reuse it.
export function createModuleGreeting(options: ModuleGreetingOptions): string {
	return `Hello, ${cleanModuleName(options.name)}!`;
}