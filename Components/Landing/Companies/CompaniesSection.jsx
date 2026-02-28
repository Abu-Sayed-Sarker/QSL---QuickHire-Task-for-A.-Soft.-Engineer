"use client";
import React from "react";
import Image from "next/image";

const companies = [
    // {
    //     id: "vodafone",
    //     type: "image",
    //     src: "/Companies/vodafone-2017-logo.png",
    //     alt: "Vodafone",
    //     width: 120,
    //     height: 36,
    // },
    // {
    //     id: "talkit",
    //     type: "image",
    //     src: "/Companies/Vector.png",
    //     alt: "Talkit",
    //     width: 100,
    //     height: 36,
    // },
    {
        id: "1",
        type: "image",
        src: "/Companies/Vector.png",
        alt: "Talkit",
        width: 100,
        height: 36,
    },
    {
        id: "2",
        type: "image",
        src: "/Companies/Vector.png",
        alt: "Talkit",
        width: 100,
        height: 36,
    },
    {
        id: "3",
        type: "image",
        src: "/Companies/Vector.png",
        alt: "Talkit",
        width: 100,
        height: 36,
    },
    {
        id: "4",
        type: "image",
        src: "/Companies/Vector.png",
        alt: "Talkit",
        width: 100,
        height: 36,
    },
    // {
    //     id: "tkit",
    //     type: "image",
    //     src: "/Companies/talkit 1.png",
    //     alt: "Talkit",
    //     width: 100,
    //     height: 36,
    // },
    // {
    //     id: "qeq",
    //     type: "image",
    //     src: "/Companies/talkit 1.png",
    //     alt: "Talkit",
    //     width: 100,
    //     height: 36,
    // },
];

export default function CompaniesSection() {
    return (
        <section className="w-full container mx-auto bg-white py-8 box-border">
            <p className="text-[13px] text-[#b0b0b0] font-normal mb-5 tracking-wide">
                Companies we helped grow
            </p>

            <div className="flex items-center justify-between flex-wrap gap-y-4">
                {companies.map((company) => (
                    <div key={company.id} className="flex items-center justify-center">
                        <Image
                            src={company.src}
                            alt={company.alt}
                            width={company.width}
                            height={company.height}
                            className="object-contain grayscale opacity-45"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
