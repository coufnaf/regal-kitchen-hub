import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
}

const CategoryCard = ({ id, name, tagline, imageUrl }: CategoryCardProps) => {
  return (
    <Link
      to={`/category/${id}`}
      className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover-lift"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-2xl font-heading font-bold text-white mb-2">{name}</h3>
        <p className="text-white/90 italic mb-4">{tagline}</p>
        <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
          <span>View More</span>
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;