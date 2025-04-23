type GetRequiredKeys<T extends object>=keyof {[P in keyof T as undefined extends T[P]?never: P]-?: T[P]};

type A = GetRequiredKeys<{ a: string; b?: number; c: boolean }>;
// Expected: "a" | "c"