import type { NextFunction, Request, Response } from 'express'

export const DEMO_USER = {
  id: 'demo-user',
  name: 'Sam Rivera',
  email: 'sam.rivera@example.com',
}

export type CurrentUser = typeof DEMO_USER

// TODO: replace with real sign-in
export function currentUser(req: Request, _res: Response, next: NextFunction) {
  req.user = DEMO_USER
  next()
}
