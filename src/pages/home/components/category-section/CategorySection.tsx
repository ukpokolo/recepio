import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../../hooks/useCategory";
import CategoryCard from "../../../../components/category-card/CategoryCard";

export default function CategoriesSection() {
  const { categories, loading, error } = useCategories();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  if (loading) {
    return (
      <section>
        <h2 className="text-primary font-bold text-xl mb-4">
          Popular Categories
        </h2>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 animate-pulse shrink-0"
              style={{ width: "clamp(80px, 12vw, 120px)" }}
            >
              <div className="w-full aspect-square rounded-[14px] bg-primary-soft" />
              <div className="h-3 w-14 rounded bg-primary-soft" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <p className="text-danger text-sm">{error}</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
      <h2 className="text-primary font-bold text-xl mb-4">
        Popular Categories
      </h2>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-bg-page to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-bg-page to-transparent z-10" />

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 select-none"
          style={{
            cursor: "grab",
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE/Edge */,
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {/* Hide webkit scrollbar via inline pseudo — handled by className below */}
          {categories.map((cat) => (
            <div
              key={cat.idCategory}
              className="shrink-0"
              style={{ width: "clamp(80px, 12vw, 120px)" }}
            >
              <CategoryCard
                name={cat.strCategory}
                imageUrl={cat.strCategoryThumb}
                onClick={(name) =>
                  navigate(`/category/${encodeURIComponent(name)}`)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
