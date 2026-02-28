"use client";
import { useGetJobsQuery, useDeleteJobMutation } from "@/Apis/api";
import Link from "next/link";
import { Loader2, Plus, Trash2, Users } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const { data: jobs, isLoading } = useGetJobsQuery();
  const [deleteJob] = useDeleteJobMutation();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#ffffff",
      borderRadius: "8px",
    });

    if (result.isConfirmed) {
      try {
        await deleteJob(id).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Job has been deleted.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
        });
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete job.",
          icon: "error",
          confirmButtonColor: "#4f46e5",
        });
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh] mt-20">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Admin <span className="text-indigo-600">Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Manage your job listings and applications
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/admin/applications"
            className="flex items-center gap-2 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 font-bold px-6 py-3 transition-all shadow-sm"
          >
            <Users size={20} />
            View Applications
          </Link>
          <Link
            href="/admin/add-job"
            className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-6 py-3 transition-all shadow-lg shadow-indigo-200"
          >
            <Plus size={20} />
            Add New Job
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Job Title
                </th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Company
                </th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Category
                </th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Date Posted
                </th>
                <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs?.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-indigo-50/30 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="font-bold text-gray-900 text-lg">
                      {job.title}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {job.location} • {job.type}
                    </div>
                  </td>
                  <td className="px-8 py-6 font-semibold text-gray-700">
                    {job.company}
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      {job.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-gray-500 font-medium">
                    {new Date(job.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-sm transition-all"
                      title="Delete Job"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {jobs?.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="text-gray-400 text-lg font-medium">
                      No jobs found. Start by adding one!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
