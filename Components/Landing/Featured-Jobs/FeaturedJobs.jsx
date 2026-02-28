"use client";
import Link from "next/link";
import { useGetJobsQuery } from "@/Apis/api";
import JobCard from "./JobCard";
import { Loader2 } from "lucide-react";

export default function FeaturedJobs() {
    const { data: jobs, isLoading } = useGetJobsQuery();

    return (
        <section className="w-full py-12">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 sm:gap-0 text-center sm:text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Featured <span className="text-blue-500">jobs</span>
                    </h2>
                    <Link
                        href="/jobs"
                        className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                        Show all jobs
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </Link>
                </div>

                {/* Job Cards Grid */}
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {jobs?.slice(0, 4).map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                        {jobs?.length === 0 && (
                            <div className="col-span-full py-12 text-center text-gray-400 font-medium">
                                No featured jobs available.
                            </div>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
}
