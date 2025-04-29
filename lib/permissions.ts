export function hasAnyAccess(
  session: any,
    requiredModules: string[]
): boolean {
    if (!session || !session.user?.modules) return false;
    return requiredModules.some((mod) => session.user.modules.includes(mod));
}
