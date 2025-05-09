import { Session } from 'next-auth';

export function hasAnyAccess(
  session: Session,
  requiredModules: string[],
): boolean {
  if (!session || !session.user?.modules) return false;
  return requiredModules.some((mod) => session.user.modules.includes(mod));
}
