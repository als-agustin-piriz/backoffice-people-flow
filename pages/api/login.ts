import type {NextApiRequest, NextApiResponse} from 'next'
import {serialize} from 'cookie'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end()

    // const {email, password} = req.body

    // const response = await fetch('https://tu-api.com/login', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({email, password}),
    // })

    // const data = await response.json()

    const response = {
        ok: true,
    }
    const data = {
        token: 'testtoken',
    }

    if (!response.ok) return res.status(401).json({message: 'Invalid credentials'})

    res.setHeader('Set-Cookie', serialize('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
    }))

    res.status(200).json({user: data})
}
