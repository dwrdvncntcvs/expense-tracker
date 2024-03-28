import { writable } from "svelte/store";

interface Modal {
    props?: {}
    name: string
}

export const modal = writable<Modal>({
    name: "",
    props: {}
})

export const addModal = (name: string, props: any) => {
    modal.set({ name, props })
}

export const removeModal = (cb: () => void) => {
    cb()
    modal.set({ name: "", props: {} })
}