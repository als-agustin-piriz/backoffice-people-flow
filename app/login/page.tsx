'use client'

import {useState} from 'react'
import {signIn, useSession} from "next-auth/react";
import {useRouter} from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {data: session} = useSession();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.ok) {
            router.push("/dashboard");
        } else {
            alert("Login fallido");
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-gray-900 px-4">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">People Flow</h1>

            <div
                className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 text-white">
                <h1 className="text-xl font-bold text-center mb-6">Iniciar sesión</h1>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 transition rounded-lg py-2 font-semibold"
                    >
                        {loading ? 'Cargando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    )
}
