import type { Category } from "./state";

export type CreateCategory = Omit<Category, "id" | "createdAt" | "updatedAt">