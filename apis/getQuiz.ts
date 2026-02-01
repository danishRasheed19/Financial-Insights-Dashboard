import { baseApi } from "./origin"

export async function getQuizQuestions() {
  const response = await baseApi.get("/personality/questions")
  return response.data
}

export async function submitQuizAnswers(payload: {
  answers: Record<string, number>
}) {
  const response = await baseApi.post("/personality/submit", payload)
  return response.data
}
