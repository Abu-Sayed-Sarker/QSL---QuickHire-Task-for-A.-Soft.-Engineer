"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateJobMutation } from "@/Apis/api";
import { Loader2, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function AddJobPage() {
  const router = useRouter();
  const [createJob, { isLoading }] = useCreateJobMutation();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "Design",
    type: "Full Time",
    description: "",
    logo: "",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      await createJob({ ...formData, tags: tagsArray }).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Job created successfully.",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      });
      router.push("/admin");
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.data?.error || "Failed to create job",
        icon: "error",
        confirmButtonColor: "#4f46e5",
      });
    }
  };

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

      <div className="bg-white border border-gray-100 shadow-2xl rounded-sm p-10 md:p-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Post a New <span className="text-indigo-600">Job</span>
        </h1>
        <p className="text-gray-500 mb-10 font-medium text-lg">
          Enter the details for the new job listing
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-sm bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-50 outline-none transition-all font-medium"
                placeholder="e.g. Senior Product Designer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-sm bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-50 outline-none transition-all font-medium"
                placeholder="e.g. Google"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-sm bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-50 outline-none transition-all font-medium"
                placeholder="e.g. New York, USA"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                Job Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-sm bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-50 outline-none transition-all font-bold text-gray-700"
              >
                <option>Design</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Technology</option>
                <option>Engineering</option>
                <option>Business</option>
                <option>Human Resource</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-sm bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-50 outline-none transition-all font-bold text-gray-700"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Remote</option>
                <option>Contract</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                Logo URL
              </label>
              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-sm bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-50 outline-none transition-all font-medium"
                placeholder="https://.../logo.png"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-sm bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-50 outline-none transition-all font-medium"
              placeholder="Design, Figma, UI/UX"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
              Full Description
            </label>
            <textarea
              name="description"
              required
              rows={8}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-sm bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-50 outline-none transition-all resize-none font-medium leading-relaxed"
              placeholder="Describe the role, requirements, and responsibilities..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-5 rounded-sm shadow-xl shadow-indigo-200 transition-all flex justify-center items-center gap-3 text-lg"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <Upload size={24} />
                Publish Job Listing
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
