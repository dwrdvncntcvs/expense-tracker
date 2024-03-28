import { writable } from "svelte/store";
import type { Expense, ExpenseMonth } from "../../types/state";
import endpoint, { request } from "$lib/utils/api";
import { generateJsonDate, monthsName, sortMonthByNames, type Month } from "$lib/utils/calendar";

const expenses = writable<Expense[]>([])
export const expensesMonth = writable<ExpenseMonth>({})

export const setExpenses = (expensesList: Expense[]) => {
    expenses.set(expensesList)
}

export const getExpenses = () => {
    return expenses
}

export const addExpense = (expense: Expense) => {
    expenses.update(val => [...val, expense])
}

export const updateExpense = (id: string, expense: Expense) => {
    expenses.update(val => val.map((ex => id === expense.id ? expense : ex)))
}

export const deleteExpense = (id: string) => {
    expenses.update(val => val.filter(expense => expense.id !== id))
}

export const getExpensesMonthsRequest = async () => {
    const response = await request.get(endpoint.expensesEndpoint("/"))
    expensesMonth.set(response.data.months)
}

export const generateExpenseMonth = (purchaseDate: string) => {
    const { month, year } = generateJsonDate(new Date(purchaseDate))
    const monthName = monthsName[month].toLowerCase()

    expensesMonth.update((val) => {
        if (!Object.keys(val).includes(String(year))) {
            val[year] = [monthName]

            return val
        }

        for (let key of Object.keys(val)) {
            if (+key === year && !val[key].includes(monthName)) {
                val[key].push(monthName)
                val[key] = sortMonthByNames(val[key] as Month[])
            }
        }

        return val
    })
}