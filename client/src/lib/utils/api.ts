import { BASE_API } from "$lib/constants";
import { Axios } from "axios";

const axiosInstance = new Axios({
    baseURL: BASE_API, withCredentials: true, headers: {
        "Content-Type": "application/json"
    }
})

const apiRequest = async (method: "post" | "get" | "put" | "delete" | "patch", endpoint: string, data?: any, headers?: any) => {
    const response = await axiosInstance[method](endpoint, JSON.stringify(data), { headers: { ...headers} })

    const responseData = JSON.parse(response.data)
    const status = response.status
    const statusText = response.statusText

    return {
        ok: status < 400,
        data: responseData,
        statusText
    }
}

export const request = {
    get: async (endpoint: string) =>
        await apiRequest("get", endpoint),
    post: async (endpoint: string, data: any) =>
        await apiRequest("post", endpoint, data),
    put: async (endpoint: string, data: string) =>
        await apiRequest("put", endpoint, data),
    delete: async (endpoint: string) =>
        await apiRequest("delete", endpoint)
}

export type BaseEndpoint = "usersEndpoint" | "expensesEndpoint" | "categoriesEndpoint"
const basedEndpoints = ['users', 'expenses', "categories"]

const generateEndpoints = (baseEndpoint: BaseEndpoint) => (endpoint: string) => {
    return `${baseEndpoint}${endpoint}`
}

export type Endpoint = {
    [x in BaseEndpoint]: (endpoint: string) => string;
};

let endpoint: Endpoint = {
    categoriesEndpoint: (endpoint: string) => "",
    expensesEndpoint: (endpoint: string) => "",
    usersEndpoint: (endpoint: string) => ""
};

for (let x of basedEndpoints) {
    endpoint = Object.defineProperty(endpoint, `${x}Endpoint`, { value: generateEndpoints(x as BaseEndpoint), writable: false })
}

export default endpoint