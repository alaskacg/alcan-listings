import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  external?: boolean;
  delay?: number;
}

const CategoryCard = ({ title, description, icon: Icon, href, external, delay = 0 }: CategoryCardProps) => {
  const CardContent = (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-card p-6 card-hover cursor-pointer opacity-0 animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-aurora-teal/10 via-transparent to-aurora-deep/10" />
      </div>
      
      {/* Border gradient */}
      <div className="absolute inset-0 rounded-2xl border border-border group-hover:border-primary/50 transition-colors duration-500" />
      
      {/* Icon */}
      <div className="relative mb-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors duration-300">
          <Icon className="w-7 h-7 text-primary group-hover:text-aurora-teal transition-colors duration-300" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Arrow indicator */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {CardContent}
      </a>
    );
  }

  return (
    <Link to={href}>
      {CardContent}
    </Link>
  );
};

export default CategoryCard;
