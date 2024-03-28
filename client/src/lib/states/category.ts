import { writable } from "svelte/store";
import type { Category } from "../../types/state";

export const categories = writable<Category[]>([])

export const setCategories = (categoryList: Category[]) => {
    categories.set(categoryList)
}

export const addCategory = (category: Category) => {
    categories.update((val) => {
        return [...val, category]
    })

}

export const removeCategory = (categoryId: string) => {
    categories.update(val => {
        return val.filter(category => category.id !== categoryId)
    })
}

