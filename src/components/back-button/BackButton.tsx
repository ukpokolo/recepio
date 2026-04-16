import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export default function BackButton({
  onClick,
  label = "Back",
  className = "",
}: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-1 text-sm font-medium text-text-muted hover:text-primary transition-colors duration-200 cursor-pointer ${className}`}
    >
      <ChevronLeft
        size={16}
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      />
      <span>{label}</span>
    </button>
  );
}