interface CategoryCardProps {
  name: string;
  imageUrl: string;
  onClick?: (name: string) => void;
  className?: string;
}

export default function CategoryCard({
  name,
  imageUrl,
  onClick,
  className = "",
}: CategoryCardProps) {
  return (
    <article
      onClick={() => onClick?.(name)}
      className={`
        group flex flex-col items-center gap-3 cursor-pointer
        ${className}
      `}
    >
      {/* Image circle */}
      <div
        className="
          relative w-full aspect-square rounded-2xl overflow-hidden
          bg-primary-soft border border-border-subtle
          shadow-sm group-hover:shadow-md
          transition-all duration-300 group-hover:-translate-y-1
        "
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Label */}
      <span className="text-sm font-medium text-text-main group-hover:text-primary transition-colors duration-200 text-center">
        {name}
      </span>
    </article>
  );
}
