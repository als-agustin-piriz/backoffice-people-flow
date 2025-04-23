import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {hasAnyAccess} from "@/lib/permissions";
import {redirect} from "next/navigation";

export async function withAuthServer(
    module: string[],
    component: () => Promise<JSX.Element>
) {
    const session = await getServerSession(authOptions);

    if (!session || !hasAnyAccess(session, module)) {
        redirect("/unauthorized");
    }

    return component();
}
