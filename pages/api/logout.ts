import {NextApiRequest, NextApiResponse} from 'next'
import {serialize} from 'cookie'

export default function logout(req: NextApiRequest, res: NextApiResponse) {
    console.log('Logout request received')
    res.setHeader('Set-Cookie', serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        path: '/',
        sameSite: 'lax',
    }))
    res.status(200).json({message: 'Logged out'})
}
