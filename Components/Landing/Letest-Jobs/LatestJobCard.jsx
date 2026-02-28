import { useRouter } from "next/navigation";

/* ── Tag color map ── */
const TAG_COLORS = {
    "Full-Time": "border border-teal-300 text-teal-600 bg-teal-50",
    Marketing: "bg-orange-100 text-orange-500",
    Design: "bg-indigo-100 text-indigo-600",
    Business: "bg-purple-100 text-purple-500",
    Technology: "bg-red-100   text-red-500",
    Engineering: "bg-blue-100 text-blue-500",
    Finance: "bg-cyan-100 text-cyan-500",
    Sales: "bg-yellow-100 text-yellow-600",
    "Human Resource": "bg-pink-100 text-pink-500",
};

/* ── Single horizontal job row card ── */
export default function LatestJobCard({ job }) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/jobs/${job.id}`)}
            className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 hover:shadow-md hover:border-blue-200 border border-transparent transition-all duration-200 cursor-pointer"
        >
            {/* Logo */}
            <div className="w-14 h-14 rounded-xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 flex items-center justify-center bg-white">
                <img
                    src={job.logo}
                    alt={job.company}
                    width={52}
                    height={52}
                    className="object-cover object-center w-full h-full"
                />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1.5 min-w-0">
                <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
                    {job.title}
                </h3>
                <p className="text-[13px] text-gray-400">
                    {job.company}
                    <span className="mx-1.5 text-gray-300">•</span>
                    {job.location}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${TAG_COLORS["Full-Time"]}`}>
                        {job.type}
                    </span>
                    {job.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${TAG_COLORS[tag] ?? "bg-gray-100 text-gray-500"}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}