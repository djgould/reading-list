import type { CurrentUser } from './current-user.ts'

declare global {
  namespace Express {
    interface Request {
      user: CurrentUser
    }
  }
}
