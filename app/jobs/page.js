"use client";
import JobCard from "@/Components/Landing/Featured-Jobs/JobCard";
import { useGetJobsQuery } from "@/Apis/api";
import React, { useState } from "react";
import { Loader2, Search, MapPin, Briefcase } from "lucide-react";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const { data: jobs, isLoading } = useGetJobsQuery({
    search,
    category,
    location,
  });

  return (
    <div className="mt-20 px-4">
      <section className="w-full max-w-7xl mx-auto">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
              Find your <span className="text-blue-600">dream job</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium max-w-2xl">
              Browse through thousands of job opportunities from top companies
              around the world.
            </p>
          </div>

          {/* Filters/Search Bar */}
          <div className="bg-white p-4 rounded-sm shadow-2xl shadow-blue-100 border border-gray-100 mb-12 flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-3 flex-1 w-full px-4 border-r border-gray-100 lg:mb-0">
              <Search className="text-blue-500" size={20} />
              <input
                type="text"
                placeholder="Job title or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-4 outline-none font-bold text-gray-700 placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-3 flex-1 w-full px-4 border-r border-gray-100">
              <MapPin className="text-blue-500" size={20} />
              <input
                type="text"
                placeholder="City or country..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full py-4 outline-none font-bold text-gray-700 placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-3 flex-1 w-full px-4">
              <Briefcase className="text-blue-500" size={20} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-4 outline-none font-bold text-gray-700 bg-transparent"
              >
                <option value="">All Categories</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Technology">Technology</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Human Resource">Human Resource</option>
              </select>
            </div>
          </div>

          {/* Job Cards Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {jobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
              {jobs?.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <h3 className="text-2xl font-bold text-gray-400">
                    No jobs found matching your criteria.
                  </h3>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
