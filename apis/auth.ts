import { baseApi } from "./origin"

export async function login(data: {
  email: string
  password: string
}) {
  const response = await baseApi.post("/auth/login", data)
  return response.data
}

export async function register(data: {
  first_name: string
  last_name: string
  email: string
  password: string
}) {
  const response = await baseApi.post("/auth/register", data)
  return response.data
}
