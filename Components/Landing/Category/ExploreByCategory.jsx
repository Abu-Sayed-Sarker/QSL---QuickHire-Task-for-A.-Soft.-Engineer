"use client";
import { useState } from "react";
import {
  Paintbrush2,
  TrendingUp,
  Megaphone,
  Wallet,
  Monitor,
  Code2,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";

const categories = [
  { id: 1, icon: Paintbrush2, title: "Design", jobs: 235 },
  { id: 2, icon: TrendingUp, title: "Sales", jobs: 756 },
  { id: 3, icon: Megaphone, title: "Marketing", jobs: 140, active: true },
  { id: 4, icon: Wallet, title: "Finance", jobs: 325 },
  { id: 5, icon: Monitor, title: "Technology", jobs: 436 },
  { id: 6, icon: Code2, title: "Engineering", jobs: 542 },
  { id: 7, icon: Briefcase, title: "Business", jobs: 211 },
  { id: 8, icon: Users, title: "Human Resource", jobs: 346 },
];

export default function ExploreByCategory() {
  const [activeId, setActiveId] = useState(3);

  return (
    <section className="w-full container mx-auto px-4 md:px-0 font-sans mt-12 md:mt-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 sm:gap-0 text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Explore by <span className="text-blue-500">category</span>
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-blue-600 font-semibold text-sm hover:underline"
        >
          Show all jobs <ArrowRight size={16} />
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(({ id, icon: Icon, title, jobs }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => setActiveId(id)}
              className={`
                relative flex flex-col items-start justify-between p-5 rounded-xl border transition-all duration-200 text-left cursor-pointer
                ${isActive
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                  : "bg-white border-gray-200 text-gray-800 hover:border-blue-400 hover:shadow-md"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`mb-6 ${isActive ? "text-white" : "text-blue-600"}`}
              >
                <Icon size={28} strokeWidth={1.6} />
              </div>

              {/* Title */}
              <div>
                <p
                  className={`font-bold text-base mb-1 ${isActive ? "text-white" : "text-gray-900"}`}
                >
                  {title}
                </p>
                <div
                  className={`flex items-center gap-1 text-sm ${isActive ? "text-blue-100" : "text-gray-500"}`}
                >
                  <span>{jobs} jobs available</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
