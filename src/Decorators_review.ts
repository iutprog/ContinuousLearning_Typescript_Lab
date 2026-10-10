export {};

// DECORATORS: a decorator is a function attached to a class or class member.
// The @name syntax asks TypeScript to apply that function to the thing below it.
//
// @someDecorator
// class Greeter {
//   // ...
// }
//
// Why use decorators? !!!!!!!!!!!!!!!!!!!!!!
// Use one when the same extra behavior belongs in several places, such as
// logging, measuring calls, or registering classes. This avoids repeating
// that supporting code inside every method.
//
// Mental model: a method decorator wraps a method. The wrapper can do work
// before and after the original method, while the method keeps its main job.

// ==================== METHOD DECORATOR =========================
// Basic meaning: a method decorator is applied to one class method using @name.
// Here, @logCall is attached directly to Greeter.greet.
//
// Why use it? Add reusable behavior around method calls (for example logging,
// timing, or checking access) without repeating that behavior in each method.
//
// Mental model: replace the method with a wrapper. The wrapper can do something
// before or after calling the original method, and can return its result.
//
// General syntax (modern TypeScript method decorator):
// function decorator(originalMethod, context) {
//   return function (...args) {
//     // extra behavior before the method
//     const result = originalMethod.call(this, ...args);
//     // extra behavior after the method
//     return result;
//   };
// }
//
// class Example {
//   @decorator
//   methodName(parameter: ParameterType): ReturnType {
//     // original method behavior
//   }
// }
//
// Example below: calling greet("Ada") logs before and after the original greet,
// which still returns "Hello, Ada!".
function logCall<This, Args extends unknown[], Return>(
	originalMethod: (this: This, ...args: Args) => Return,
	context: ClassMethodDecoratorContext<
		This,
		(this: This, ...args: Args) => Return
	>
) {
	return function (this: This, ...args: Args): Return {
		console.log(`Starting ${String(context.name)}`);
		const result = originalMethod.call(this, ...args);
		console.log(`Finished ${String(context.name)}`);
		return result;
	};
}

class Greeter {
	@logCall
	greet(name: string): string {
		return `Hello, ${name}!`;
	}
}

// Calling greet prints the start message, runs greet, then prints the finish message.
const greeter = new Greeter();
console.log(greeter.greet("Ada"));

// Expected output:
// Starting greet
// Finished greet
// Hello, Ada!

// The decorator is applied when the class is defined; its returned function
// runs each time the decorated method is called.


// ====================  DECORATOR FACTORY =========================
// Basic meaning: a decorator factory is a function that accepts configuration
// and returns a decorator. Here, it captures a message to log.
//
// Why use it? Reuse the same decorator behavior with different settings.
//
// Both methods use the same wrapper logic, but each gets a different message. 
// The factory does not automatically apply itself to every method; 
// you still attach it to each method you want decorated.
// If every method needs exactly the same behavior and no different settings, 
// a regular method decorator like @logCall is enough. 
// A factory is useful when you want to reuse the behavior and configure it differently
//  for each method.

// Mental model: the factory is a setting dial. Set the message first; it gives
// back a decorator that uses that message when the method is called.
//
// Modern syntax: @logWithMessage("Starting greeting") calls the factory,
// which returns a method decorator with the same signature pattern as logCall.
function logWithMessage<This, Args extends unknown[], Return>(message: string) {
	return function (
		originalMethod: (this: This, ...args: Args) => Return,
		_context: ClassMethodDecoratorContext<
			This,
			(this: This, ...args: Args) => Return
		>
	) {
		return function (this: This, ...args: Args): Return {
			console.log(message);
			return originalMethod.call(this, ...args);
		};
	};
}

class SimpleGreeter {
	@logWithMessage("Starting greeting")
	greet(name: string): string {
		return `Hello, ${name}!`;
	}

	@logWithMessage("Starting farewell")
	farewell(name: string): string {
		return `Goodbye, ${name}!`;
	}
}

const simpleGreeter = new SimpleGreeter();
console.log(simpleGreeter.greet("Ada"));
console.log(simpleGreeter.farewell("Ada"));

// Output shows each method's own configured message before its result:
// Starting greeting
// Hello, Ada!
// Starting farewell
// Goodbye, Ada!

// ==================== CLASS DECORATOR =========================
// Basic meaning: a class decorator is attached to the class itself, not one
// particular method. It runs when the class is defined.
//
// Why use it? Add behavior that applies to the whole class, such as registering
// a class, adding metadata, or wrapping construction.
//
// Mental model: a method decorator customizes one method; a class decorator
// customizes or handles the class as a whole.
const registeredClassNames: string[] = [];

function registerClass(_value: Function, context: ClassDecoratorContext): void {
	registeredClassNames.push(String(context.name));
}

@registerClass
class UserService {
	findUser(id: number): string {
		return `User ${id}`;
	}
}

// The decorator runs at class definition time and records "UserService".
console.log(registeredClassNames); // ["UserService"]

// Another example: add a static version property to the class constructor.
// A static property belongs to the class itself, so read it as Service.version,
// not from an instance such as new Service().version.
function addVersion<Class extends abstract new (...args: any[]) => any>(
	value: Class,
	_context: ClassDecoratorContext<Class>
): Class & { version: string } {
	return Object.assign(value, { version: "1.0" });
}

@addVersion
class PaymentService {
	static declare version: string; // TypeScript declaration; addVersion supplies the runtime value.

	processPayment(): string {
		return "Payment processed";
	}
}

console.log(PaymentService.version); // "1.0"
console.log(new PaymentService().processPayment()); // "Payment processed"


// ==================== PROPERTY DECORATOR =========================
// Basic meaning: a modern field decorator can return an initializer function
// that changes a class property's starting value for each new instance.
//
// Why use it? Apply the same initialization rule to selected fields, such as
// trimming initial text or supplying a default value.
//
// Mental model: the decorator supplies a small setup step: when an instance is
// created, that step adjusts the starting value before it is stored. It does
// not intercept later assignments to the property.
function trimInitialValue<This>(
	_value: undefined,
	_context: ClassFieldDecoratorContext<This, string>
): (initialValue: string) => string {
	return (initialValue) => initialValue.trim();
}

class UserProfile {
	@trimInitialValue
	displayName = "  Ada Lovelace  ";
}

const userProfile = new UserProfile();
console.log(userProfile.displayName); // "Ada Lovelace"
