interface MealTag {
  label: string;
}

interface MealCardProps {
  id: string;
  title: string;
  imageUrl: string;
  tags?: MealTag[];
  onClick?: (id: string) => void;
  className?: string;
}

export default function MealCard({
  id,
  title,
  imageUrl,
  tags = [],
  onClick,
  className = "",
}: MealCardProps) {
  return (
    <article
      onClick={() => onClick?.(id)}
      className={`
        group bg-bg-card rounded-2xl overflow-hidden border border-border-subtle
        shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer
        hover:-translate-y-1
        ${className}
      `}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-text-main font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-primary-soft text-primary border border-border-subtle"
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}