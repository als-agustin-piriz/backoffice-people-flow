import {fetchApiWithAuth} from '@/lib/fetchApiWithAuth';
import {apiRoutes} from '@/lib/routes';

export const POST = async (req: Request) => {
    const body = await req.json();

    const data = await fetchApiWithAuth(apiRoutes.modules.createModule, {
        method: 'POST',
        body,
    });

    return Response.json(data);
};

export const GET = async () => {
    const data = await fetchApiWithAuth(apiRoutes.modules.getModules);

    return Response.json(data);
};
