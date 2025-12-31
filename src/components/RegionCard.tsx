import { Link } from "react-router-dom";

interface RegionCardProps {
  name: string;
  description: string;
  href: string;
  external?: boolean;
  imageUrl?: string;
  delay?: number;
}

const RegionCard = ({ name, description, href, external, delay = 0 }: RegionCardProps) => {
  const CardContent = (
    <div 
      className="group relative overflow-hidden rounded-2xl h-48 cursor-pointer opacity-0 animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-secondary transition-all duration-500" />
      
      {/* Aurora overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-aurora-teal/20 via-aurora-cyan/10 to-aurora-deep/20" />
      </div>
      
      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-border group-hover:border-primary/50 transition-colors duration-500" />
      
      {/* Mountain silhouette decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
          <path 
            d="M0,80 L50,40 L100,60 L150,20 L200,50 L250,30 L300,55 L350,25 L400,45 L400,80 Z" 
            fill="currentColor" 
            className="text-primary"
          />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
        <h3 className="font-display text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm max-w-[200px]">
          {description}
        </p>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:left-full transition-all duration-1000 ease-out" />
      </div>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {CardContent}
      </a>
    );
  }

  return (
    <Link to={href} className="block">
      {CardContent}
    </Link>
  );
};

export default RegionCard;
