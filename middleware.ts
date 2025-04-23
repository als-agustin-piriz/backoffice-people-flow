import {NextRequest, NextResponse} from 'next/server'

export function middleware(req: NextRequest) {
    // const token = req.cookies.get('token')?.value
    // console.log('Token:', token)
    // console.log('Req:', req)

    // if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
    //     return NextResponse.redirect(new URL('/login', req.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard'],
}
