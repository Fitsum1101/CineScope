import RecommendedSection from "./_components/recommeded-section";
import TrendingCarousel from "./_components/treding-carousel";
import HeroBanner from "./_components/hero_banner";
import SearchBar from "./_components/search-bar";
import GenreGrid from "./_components/genere";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <SearchBar />
      <TrendingCarousel />
      <RecommendedSection />
      <GenreGrid />
    </div>
  );
}
