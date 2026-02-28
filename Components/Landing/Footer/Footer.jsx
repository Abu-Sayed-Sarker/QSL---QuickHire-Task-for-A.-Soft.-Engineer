"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ── Social Icon SVGs ── */
const FacebookIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);
const InstagramIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
);
const DribbbleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
    </svg>
);
const LinkedInIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);
const TwitterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

const aboutLinks = ["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"];
const resourceLinks = ["Help Docs", "Guide", "Updates", "Contact Us"];
const socialIcons = [
    { label: "Facebook", Icon: FacebookIcon },
    { label: "Instagram", Icon: InstagramIcon },
    { label: "Dribbble", Icon: DribbbleIcon },
    { label: "LinkedIn", Icon: LinkedInIcon },
    { label: "Twitter", Icon: TwitterIcon },
];

export default function Footer() {
    const [email, setEmail] = useState("");

    return (
        <footer className="w-full bg-[#1e2132] text-white">

            {/* ── Main Footer Content ── */}
            <div className="container mx-auto px-6 pt-14 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* ── Col 1: Brand ── */}
                    <div className="flex flex-col gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/Main/logo.png" alt="Logo" width={200} height={100} />
                        </Link>

                        {/* Tagline */}
                        <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">
                            Great platform for the job seeker that passionate about startups. Find your dream job easier.
                        </p>
                    </div>

                    {/* ── Col 2: About ── */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-5 tracking-wide">About</h3>
                        <ul className="flex flex-col gap-3">
                            {aboutLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 3: Resources ── */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-5 tracking-wide">Resources</h3>
                        <ul className="flex flex-col gap-3">
                            {resourceLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Col 4: Newsletter ── */}
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-3 tracking-wide">Get job notifications</h3>
                        <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-[240px]">
                            The latest job news, articles, sent to your inbox weekly.
                        </p>
                        <div className="flex items-center gap-0 overflow-hidden rounded-lg border border-gray-600">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="
                  flex-1 min-w-0 bg-transparent text-sm text-gray-200
                  placeholder:text-gray-500 px-3 py-2.5
                  outline-none border-none
                "
                            />
                            <button
                                onClick={() => { }}
                                className="
                  bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold
                  px-4 py-2.5 flex-shrink-0 whitespace-nowrap
                  transition-colors duration-200
                "
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-gray-700/60 mx-6" />

            {/* ── Bottom Bar ── */}
            <div className="container mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-gray-500">
                    2021 @ QuickHire. All rights reserved.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-2.5">
                    {socialIcons.map(({ label, Icon }) => (
                        <a
                            key={label}
                            href="#"
                            aria-label={label}
                            className="
                w-8 h-8 rounded-full border border-gray-600
                flex items-center justify-center
                text-gray-400 hover:text-white hover:border-gray-400
                transition-all duration-200
              "
                        >
                            <Icon />
                        </a>
                    ))}
                </div>
            </div>

        </footer>
    );
}
