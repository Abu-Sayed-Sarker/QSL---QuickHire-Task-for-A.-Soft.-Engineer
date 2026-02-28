import HeroSection from "@/Components/Landing/Hero-Section/HeroSection";
import CompaniesSection from "@/Components/Landing/Companies/CompaniesSection";
import ExploreByCategory from "@/Components/Landing/Category/ExploreByCategory";
import FeaturedJobs from "@/Components/Landing/Featured-Jobs/FeaturedJobs";
import LatestJobs from "@/Components/Landing/Letest-Jobs/LetestJobs";
import CtaBanner from "@/Components/Landing/CTA/CtaBanner";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <CompaniesSection />
      <CtaBanner />
      <ExploreByCategory />
      <FeaturedJobs />
      <LatestJobs />
    </div>
  );
}
