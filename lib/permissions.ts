import {Session} from "next-auth";
import {navigationItems} from "@/lib/navigation";

export function hasAnyAccess(
    session: Session | null,
    requiredModules: string[]
): boolean {
    if (!session || !session.user?.modules) return false;
    return requiredModules.some((mod) => session.user.modules.includes(mod));
}

export function filterNavigationByAccess(
    session: Session | null,
    items: typeof navigationItems
) {
    return items.filter((item) => hasAnyAccess(session, item.requiredModules));
}