import React, { useState, useEffect } from 'react';
import nizamproverLogo from '../assets/images/nzmprover.png';

export function DynamicHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50); // 50px scroll sonrası değişim
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky z-50 flex justify-center transition-all duration-300 md:mx-0 ${
            isScrolled ? 'mx-4 top-6 mb-6' : 'top-4 mx-0 mb-8'
        }`}>
            <div style={{ width: isScrolled ? '1024px' : '1248px' }}>
                <div className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 xl:px-0 ${
                    isScrolled
                        ? 'border border-gray-200 bg-white/75 px-2 shadow-lg backdrop-blur-lg'
                        : 'px-7 shadow-none'
                }`}>
                    <div className="grid min-h-[66px] grid-cols-3 items-center gap-4 pl-4 pr-1">
                        {/* Left Section - Powered by + Logo */}
                        <div className="flex items-center gap-3">
                            <span className="hidden min-w-fit truncate text-xs lg:block text-gray-600">
                                Powered by
                            </span>
                            <a
                                href="https://twitter.com/Farukins"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer hover:opacity-75 transition-opacity duration-200"
                            >
                                <img
                                    src={nizamproverLogo}
                                    alt="Nizamprover"
                                    className="h-5 w-auto"
                                />
                            </a>
                        </div>

                        {/* Center Section - Main Title */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">🍓</span>
                            </div>
                            <div className="hidden md:block">
                                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Boundless ZK Fee Analyzer
                                </h2>
                                <p className="text-xs text-gray-500">Method-Based Transaction Analysis</p>
                            </div>
                        </div>

                        {/* Right Section - Actions */}
                        <div className="flex shrink-0 flex-row items-center justify-end gap-1 md:gap-3">
                            <div className="hidden items-center space-x-3 sm:flex">
                                {/* Twitter Logo */}
                                <a
                                    href="https://twitter.com/Farukins"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>

                                {/* GitHub Logo */}
                                <a
                                    href="https://github.com/Farukest"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                type="button"
                                className="flex size-8 cursor-pointer items-center justify-center rounded-md border border-gray-200 md:hidden hover:bg-gray-100 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="size-5"
                                    aria-hidden="true"
                                >
                                    <path d="M4 12h16"></path>
                                    <path d="M4 18h16"></path>
                                    <path d="M4 6h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}