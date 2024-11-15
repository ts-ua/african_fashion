// pages/login/index.js
'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaGoogle } from "react-icons/fa";
import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";


export default function LoginPage() {
    const { status } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    const handleGoogleLogin = () => {
        signIn('google');
    };

    const handleEmailLogin = async (e: any) => {
        e.preventDefault();
        setError('');

        const result = signIn('credentials', {
            redirect: false,
            useremail: email,
            password: password,
        });
    };


    return (
        <div
            className=" min-h-screen justify-center text-center flex flex-col items-center bg-gray-50 dark:bg-gray-800 "
        >
            <div className='flex flex-col border dark:border-primaryHotefy-lighter dark:bg-[#18181b] items-center justify-center p-8 rounded-lg w-[450px] shadow-lg'>
                <div className='flex items-center gap-4'>

                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                        African Fashion
                    </h1>
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-100 mb-8">
                    Sign in to continue
                </p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="flex flex-col  gap-4 items-center w-full " onSubmit={handleEmailLogin}>
                    <Input
                        fullWidth
                        placeholder="Enter your email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                    <Input
                        fullWidth
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                    <Button
                        type="submit"
                        className="w-full bg-secondary text-white  mt-8"
                    >
                        Sign in with Email
                    </Button>
                </form>
                <Button
                    className="flex items-center w-full gap-2 px-4 mt-4 text-white bg-secondary"
                    onClick={handleGoogleLogin}
                >
                    <FaGoogle />
                    <span>Sign in with Google</span>
                </Button>

                <p className="mt-4 text-gray-600 dark:text-gray-100">
                    Don't have any account?{' '}
                    <a
                        href="/register"
                        className="text-blue-500 hover:underline"
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/user/register');
                        }}
                    >
                        Create an Account
                    </a>
                </p>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                </div>
            </div>
        </div>
    );
}
