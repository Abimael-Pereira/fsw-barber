// Extend NextAuth types globally
import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  // eslint-disable-next-line no-unused-vars
  interface User extends DefaultUser {
    id: string
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    id: string
  }
}
