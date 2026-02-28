import { useRouter } from "next/navigation";

const TAG_COLORS = {
    Marketing: "bg-orange-50 text-orange-400",
    Design: "bg-green-50 text-green-500",
    Business: "bg-purple-50 text-purple-500",
    Technology: "bg-red-50 text-red-400",
    Engineering: "bg-blue-50 text-blue-500",
    Finance: "bg-cyan-50 text-cyan-500",
    Sales: "bg-yellow-50 text-yellow-600",
    "Human Resource": "bg-pink-50 text-pink-500",
};



export default function JobCard({ job }) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/jobs/${job.id}`)}
            className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer"
        >
            {/* Top row: Logo + Badge */}
            <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center bg-white">
                    <img
                        src={job.logo}
                        alt={job.company}
                        width={44}
                        height={44}
                        className="object-cover object-center w-full h-full"
                    />
                </div>
                <span className="text-[11px] font-semibold text-blue-500 border border-blue-400 rounded px-2 py-0.5 tracking-wide">
                    {job.type}
                </span>
            </div>

            {/* Title + Company + Location */}
            <div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-0.5">{job.title}</h3>
                <p className="text-[13px] text-gray-400">
                    {job.company}
                    <span className="mx-1">·</span>
                    {job.location}
                </p>
            </div>

            {/* Description */}
            <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-2">
                {job.description}
            </p>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
                {job.tags.map((tag) => (
                    <span
                        key={tag}
                        className={`text-[12px] font-medium px-3 py-1 rounded-full ${TAG_COLORS[tag] ?? "bg-gray-100 text-gray-500"}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}