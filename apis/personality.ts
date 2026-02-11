import { baseApi } from "./origin"

export async function getPersonality(payload : {user_id : string}) {
  const response = await baseApi.post("/personality/personalityType",payload)
  return response.data
}

