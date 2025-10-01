import { DefaultSession } from "next-auth"

// Export utility types for the app
export interface ExtendedUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export interface ExtendedSession extends DefaultSession {
  user: ExtendedUser
}
