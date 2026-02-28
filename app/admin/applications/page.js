"use client";
import { useGetApplicationsQuery } from "@/Apis/api";
import { Loader2, ArrowLeft, ExternalLink, Mail, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminApplicationsPage() {
  const { data: applications, isLoading } = useGetApplicationsQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold mb-8 transition-colors group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Dashboard
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Job <span className="text-indigo-600">Applications</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium text-lg">
          Review applications submitted by candidates
        </p>
      </div>

      <div className="grid grid-cols-1 rounded-sm gap-6">
        {applications?.map((app) => (
          <div
            key={app.id}
            className="bg-white border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900">
                      {app.name}
                    </h3>
                    <p className="text-gray-500 flex items-center gap-1.5 font-medium">
                      <Mail size={14} />
                      {app.email}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-sm p-5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <FileText size={14} />
                    Cover Note
                  </h4>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {app.cover_note || "No cover note provided."}
                  </p>
                </div>
              </div>

              <div className="md:w-72 space-y-4">
                <div className="bg-indigo-50/50 rounded-sm p-5 border border-indigo-50">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">
                    Applied for
                  </h4>
                  <p className="text-gray-900 font-bold text-lg leading-tight">
                    {app.job_title}
                  </p>
                  <p className="text-indigo-600 font-semibold text-sm">
                    {app.job_company}
                  </p>
                </div>

                <a
                  href={app.resume_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-sm transition-all shadow-lg shadow-gray-200"
                >
                  <ExternalLink size={18} />
                  View Resume
                </a>

                <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-tighter">
                  Submitted {new Date(app.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {applications?.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-sm py-24 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-sm flex items-center justify-center mx-auto mb-6 text-gray-300">
              <FileText size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              No applications yet
            </h3>
            <p className="text-gray-500 font-medium">
              When candidates apply, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper icons
function Users({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
