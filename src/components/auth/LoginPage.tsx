"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { stations } from './stations';
import Cookies from 'universal-cookie';
import { AUTH_API } from '@/api/endpoints/rest-api/auth/auth';
import { IDecodedJWT } from '@/interfaces/auth/auth';
import { encryptToken } from '@/api/lib/ecryptUser';
import { jwtDecode } from 'jwt-decode';
import LoaderComponent from '../loader';


const LoginPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const cookies = new Cookies();


    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % stations.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);


    const handleLogin = (e: any) => {
        e.preventDefault();
        setLoginError('');
        setLoading(true);

        // Mock login credentials
        const mockUsers = [
            { email: 'superadmin@example.com', password: 'superadmin123', role: 'SuperAdmin' },
            { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
            { email: 'manager@example.com', password: 'manager123', role: 'Manager' }
        ];

        const user = mockUsers.find(user => user.email === email && user.password === password);

        setTimeout(() => {
            if (user) {
                const userCredentials = {
                    email: user.email,
                    role: user.role
                };

                cookies.set("userCredentials", JSON.stringify(userCredentials), {
                    path: '/',
                    secure: true,
                    sameSite: 'lax'
                });

                if (user.role === "SuperAdmin") {
                    router.replace("/super/stations");
                } else if (user.role === "Admin") {
                    router.replace("/stations");
                } else if (user.role === "Manager") {
                    router.replace("/manager/dashboard");
                }
            } else {
                setLoading(false);
                setLoginError("Invalid email or password.");
            }
        }, 3000);
       
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={stations[activeIndex].logo}
                        alt="Background"
                        className="w-full h-full object-cover blur-md opacity-20"
                        width={100}
                        height={100}
                    />
                </motion.div>
            </AnimatePresence>
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl w-full max-w-md border border-white/20"
                >
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center mb-8"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {stations[activeIndex].name}
                            </h2>
                            <p className="text-gray-800 italic font-medium">
                                "{stations[activeIndex].slogan}"
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-gray-900 mb-2 font-semibold">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/40 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-900 mb-2 font-semibold">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/40 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-gray-500 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all flex justify-center items-center"
                                type="submit"
                            >
                                {loading ? <LoaderComponent /> : "Sign In"}
                            </motion.button>
                        </div>
                           <p className="text-center text-red-400">
                            {loginError}
                           </p>
                    </form>

                    <p className="text-center text-gray-800 mt-6">
                        Forgot your password?
                        <a href="#" className="text-gray-600 hover:text-gray-800">
                            Reset it
                        </a>
                    </p>


                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;