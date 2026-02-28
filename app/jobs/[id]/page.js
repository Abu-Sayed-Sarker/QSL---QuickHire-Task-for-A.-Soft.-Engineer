"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetJobByIdQuery, useSubmitApplicationMutation } from "@/Apis/api";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function JobDetailPage() {
  const { id } = useParams();
  const { data: job, isLoading, error } = useGetJobByIdQuery(id);
  const [submitApplication, { isLoading: isSubmitting }] =
    useSubmitApplicationMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitApplication({ job_id: id, ...formData }).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Application submitted successfully!",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      });
      setFormData({ name: "", email: "", resume_link: "", cover_note: "" });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.data?.error || "Failed to submit application",
        icon: "error",
        confirmButtonColor: "#4f46e5",
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Job not found or server error
      </div>
    );
  if (!job) return null;

  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold mb-8 transition-colors group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Jobs
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-sm border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center bg-white">
              <img
                src={job.logo || "/placeholder-logo.png"}
                alt={job.company}
                width={60}
                height={60}
                className="object-cover w-full object-center"
              />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                {job.title}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-gray-500 font-medium">
                <span>{job.company}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span className="text-indigo-600 bg-indigo-50 px-3 py-0.5 rounded-full text-sm">
                  {job.type}
                </span>
              </div>
            </div>
          </div>

          <div className="prose prose-indigo max-w-none">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Job Description
            </h3>
            <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          <div className="pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
            <div className="flex gap-2 flex-wrap">
              {job.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-sm text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Form */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-sm p-8 h-fit sticky top-24">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply Now</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-sm bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-sm bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Resume Link (URL)
              </label>
              <input
                type="url"
                name="resume_link"
                required
                value={formData.resume_link}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-sm bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="https://drive.google.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Cover Note
              </label>
              <textarea
                name="cover_note"
                rows={4}
                value={formData.cover_note}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-sm bg-gray-50 border border-gray-100 focus:border-indigo-500 focus:bg-white outline-none transition-all resize-none"
                placeholder="Why should we hire you?"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-4 rounded-sm shadow-lg shadow-indigo-200 transition-all flex justify-center items-center gap-2 group"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Submit Application"
              )}
              {!isSubmitting && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
