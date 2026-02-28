"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/Components/Layout/Navbar/navbar";
import Footer from "@/Components/Landing/Footer/Footer";

export default function MainLayout({ children }) {
    const pathname = usePathname();

    // Define paths where Navbar and Footer should be hidden
    const isAuthPage = pathname === "/login" || pathname === "/register";

    return (
        <>
            {!isAuthPage && <Navbar />}
            <div className="min-h-[60vh]">{children}</div>
            {!isAuthPage && <Footer />}
        </>
    );
}
