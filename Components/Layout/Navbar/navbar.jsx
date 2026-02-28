"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/Controllers/authSlice'
import { useRouter } from 'next/navigation'
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react'

export default function Navbar() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [scrollY, setScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        setIsMenuOpen(false);
        router.push('/login');
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`${scrollY > 50 ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"} fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
            <nav className="flex items-center justify-between container mx-auto px-4 md:px-0">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 z-50">
                    <Image src="/Main/Logo.png" alt="Logo" width={160} height={80} className="w-32 md:w-44" />
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-gray-700 font-medium hover:text-indigo-600 transition-colors text-sm">
                        Home
                    </Link>
                    <Link href="/jobs" className="text-gray-700 font-medium hover:text-indigo-600 transition-colors text-sm">
                        Find Jobs
                    </Link>
                    {user?.role === 'admin' && (
                        <Link href="/admin" className="text-gray-700 hover:text-indigo-600 transition-colors text-sm font-bold">
                            Admin
                        </Link>
                    )}
                </div>

                {/* Desktop Auth Buttons */}
                <div className='hidden md:block'>
                    <div className="flex items-center gap-4">
                        {!isAuthenticated ? (
                            <>
                                <Link href="/login" className="text-indigo-700 font-semibold text-sm hover:text-indigo-900 transition-colors">
                                    Login
                                </Link>
                                <Link href="/register" className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-2.5 rounded-sm text-sm transition-colors">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{user?.role}</span>
                                    <span className="text-sm font-bold text-gray-900">{user?.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="border-2 border-indigo-700 text-indigo-700 hover:bg-indigo-50 font-bold px-6 py-2 rounded-sm text-sm transition-all flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 p-2 text-gray-700 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`
                    fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 md:hidden transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
                `}>
                    <div className="flex flex-col gap-6">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl font-bold text-gray-900 border-b border-gray-50 pb-4"
                        >
                            Home
                        </Link>
                        <Link
                            href="/jobs"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl font-bold text-gray-900 border-b border-gray-50 pb-4"
                        >
                            Find Jobs
                        </Link>
                        {user?.role === 'admin' && (
                            <Link
                                href="/admin"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl font-bold text-indigo-600 border-b border-gray-50 pb-4"
                            >
                                Admin Dashboard
                            </Link>
                        )}

                        <div className="mt-4 flex flex-col gap-4">
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center py-4 text-indigo-700 font-bold border-2 border-indigo-700 rounded-sm"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center py-4 bg-indigo-700 text-white font-bold rounded-sm shadow-lg shadow-indigo-100"
                                    >
                                        Sign Up For Free
                                    </Link>
                                </>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-sm">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                            <UserIcon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{user?.role}</p>
                                            <p className="text-lg font-bold text-gray-900">{user?.name}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-2 py-4 border-2 border-red-500 text-red-500 font-bold rounded-sm transition-colors"
                                    >
                                        <LogOut size={20} />
                                        Logout Account
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
