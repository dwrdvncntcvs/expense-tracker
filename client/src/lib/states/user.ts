import { writable } from "svelte/store";
import type { User } from "../../types/state";

export const user = writable<User | undefined>(undefined)
export const isAuthenticated = writable(false)

export const setUser = (userData: User) => {
    user.set(userData)
    isAuthenticated.set(true)
}
export const removeUser = () => {
    user.set(undefined)
    isAuthenticated.set(false)
}