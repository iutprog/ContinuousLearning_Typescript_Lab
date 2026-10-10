// Second declaration with the same interface name. TypeScript merges it with
// LessonUser from declaration-merging.base.d.ts.
interface LessonUser {
	role: string;
}