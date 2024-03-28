export const parseName = (name: string, separator: string) =>
    name
        .split(separator)
        .map(val => `${val.charAt(0).toUpperCase()}${val.slice(1, val.length).toLowerCase()}`)
        .join(" ")

