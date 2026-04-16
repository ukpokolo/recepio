import Hero from "../../components/hero/hero";
import CategoriesSection from "./components/category-section/CategorySection";
import AreaSection from "./components/area-section/AreaSection";
import RandomMealSection from "./components/random-meal-section/RandomMealSection";

const Home = () => {
  return (
    <div style={{ background: "var(--color-bg-page)" }}>
      <Hero />
      <CategoriesSection />
      <RandomMealSection />
      <AreaSection />
    </div>
  );
};

export default Home;
