export interface PersonalityType {
  user_id: string
  personality_type: string
  risk: string
  planning: string
  description: string
  scores: Record<string, number>
}
