"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function QuickHireLanding() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("Florence, Italy");
  const [searchFocused, setSearchFocused] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const dropdownRef = useRef(null);

  const locationOptions = [
    "Florence, Italy",
    "Rome, Italy",
    "Milan, Italy",
    "New York, USA",
    "London, UK",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="w-full bg-cover bg-center pt-24 md:pt-0"
      style={{ backgroundImage: "url('/Main/Desktop.png')" }}
    >
      <div className="min-h-[85vh] md:h-[90vh] container mx-auto px-4 md:px-0 w-full font-sans flex flex-col md:flex-row items-center justify-between overflow-hidden py-12 md:py-0 text-center md:text-left">

        {/* ── Left Content ── */}
        <div className="flex-1 max-w-2xl z-10 w-full flex flex-col items-center md:items-start">

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-2">
            Discover
            <br />
            more than
          </h1>
          <div className="mb-2 w-full flex flex-col items-center md:items-start">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-500 leading-tight">
              5000+ Jobs
            </h1>
            <div className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[440px]">
              <Image
                src="/Main/Vector.png"
                alt="Underline"
                width={440}
                height={18}
                className="w-full h-auto"
              />
            </div>
          </div>

          <p className="text-gray-500 text-sm sm:text-base mt-6 mb-8 leading-relaxed max-w-sm">
            Great platform for the job seeker that searching for
            <br className="hidden sm:block" />
            new career heights and passionate about startups.
          </p>

          {/* ── Search Bar ── */}
          <div
            className={`
              flex flex-col md:flex-row items-center bg-white rounded-2xl mb-3 p-4 md:pl-4 md:pr-2 md:py-2 w-full max-w-[560px] gap-4 md:gap-0
              transition-all duration-300
              ${searchFocused
                ? "shadow-[0_0_0_3px_rgba(99,102,241,0.18),0_8px_32px_rgba(99,102,241,0.10)] border border-indigo-300/40"
                : "shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-black/[0.06]"
              }
            `}
          >
            {/* Job Title Input */}
            <div className="flex items-center gap-2.5 w-full md:flex-1 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-gray-100 md:border-gray-200 pb-3 md:pb-0">

              <span
                className={`
                  flex items-center justify-center w-[30px] h-[30px] rounded-full flex-shrink-0
                  transition-all duration-300
                  ${searchFocused
                    ? "bg-gradient-to-br from-indigo-500 to-blue-400 shadow-[0_0_0_4px_rgba(99,102,241,0.15)]"
                    : "bg-indigo-50"
                  }
                `}
              >
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke={searchFocused ? "#fff" : "#6366f1"}
                  className="transition-all duration-300"
                >
                  <circle cx="11" cy="11" r="8" strokeWidth="2.2" />
                  <path d="m21 21-4.35-4.35" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </span>

              <div className="flex-1 text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  Job Title
                </p>
                <input
                  type="text"
                  placeholder="e.g. UI Designer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full outline-none border-none bg-transparent text-[13px] font-medium text-gray-900 tracking-wide placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* ── Location Dropdown ── */}
            <div className="relative w-full md:flex-1 px-0 md:px-3 mb-2 md:mb-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLocationOpen((o) => !o)}
                className="flex items-center gap-2 w-full bg-transparent border-none p-0 cursor-pointer"
              >
                <span
                  className={`
                    flex items-center justify-center w-[30px] h-[30px] rounded-full flex-shrink-0
                    transition-all duration-300
                    ${locationOpen
                      ? "bg-gradient-to-br from-indigo-500 to-blue-400 shadow-[0_0_0_4px_rgba(99,102,241,0.15)]"
                      : "bg-indigo-50"
                    }
                  `}
                >
                  <svg
                    width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke={locationOpen ? "#fff" : "#6366f1"}
                    className="transition-all duration-300"
                  >
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" strokeWidth="2" />
                  </svg>
                </span>

                <div className="flex-1 text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 block md:hidden">
                    Location
                  </p>
                  <span className="block text-[13px] font-medium text-gray-700 tracking-wide truncate">
                    {location}
                  </span>
                </div>

                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af"
                  className={`flex-shrink-0 transition-transform duration-300 ${locationOpen ? "rotate-180" : "rotate-0"}`}
                >
                  <path strokeWidth="2" strokeLinecap="round" d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div
                className={`
                  absolute top-[calc(100%+12px)] left-0 md:-left-3 min-w-full md:min-w-[220px] bg-white rounded-2xl
                  border border-indigo-100 overflow-hidden z-50
                  shadow-[0_8px_32px_rgba(99,102,241,0.13),0_2px_8px_rgba(0,0,0,0.07)]
                  transition-all duration-[220ms] ease-[cubic-bezier(.4,0,.2,1)]
                  ${locationOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-2 scale-[0.97] pointer-events-none"}
                `}
              >
                <div className="px-3.5 pt-2.5 pb-1.5 border-b border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em]">
                    Select Location
                  </span>
                </div>

                {locationOptions.map((opt) => {
                  const isSelected = location === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => { setLocation(opt); setLocationOpen(false); }}
                      className={`
                        flex items-center gap-2.5 w-full px-3.5 py-2.5 border-none cursor-pointer
                        text-left transition-colors duration-150
                        ${isSelected
                          ? "bg-gradient-to-r from-violet-50 to-blue-50"
                          : "bg-transparent hover:bg-slate-50"
                        }
                      `}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke={isSelected ? "#6366f1" : "#d1d5db"}>
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" strokeWidth="2" />
                      </svg>
                      <span className={`text-[13px] transition-colors duration-150 ${isSelected ? "font-semibold text-indigo-700" : "font-normal text-gray-700"}`}>
                        {opt}
                      </span>
                      {isSelected && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" className="ml-auto">
                          <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={() => { }}
              className="
                flex items-center justify-center gap-2 w-full md:w-auto md:flex-shrink-0
                bg-indigo-600 hover:bg-indigo-700
                text-white text-[13px] font-bold tracking-wide
                px-5 py-3 md:py-2.5 rounded-xl
                shadow-[0_4px_16px_rgba(79,70,229,0.35)] hover:shadow-[0_8px_24px_rgba(79,70,229,0.45)]
                transition-all duration-200 hover:-translate-y-px hover:scale-[1.03]
                whitespace-nowrap
              "
            >
              Search
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff">
                <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* Popular Tags */}
          <p className="text-xs sm:text-sm text-gray-500 mb-6 md:mb-0">
            <span className="font-medium text-gray-700">Popular :</span>{" "}
            {["UI Designer", "UX Researcher", "Android", "Admin"].map((tag, i, arr) => (
              <span key={tag}>
                <a href="#" className="hover:text-blue-600 transition-colors cursor-pointer">
                  {tag}
                </a>
                {i < arr.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>

        {/* ── Right — Person Image ── */}
        <div className="flex-1 relative h-full hidden lg:block">
          <div className="absolute bottom-0 left-0">
            <Image
              src="/Main/design-b3dcb2a2-23f6-41f0-b740-595184e6d3e9 1.png"
              alt="Hero Image"
              width={480}
              height={480}
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
}