import { Star } from "lucide-react";

import { formatPriceToCurrency } from "@/lib/currency";
import { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="bg-white border border-slate-950 px-6 py-4 shadow-black shadow-[5px_5px_0px_0px_rgba(0,0,0)]">
      <div className="w-full aspect-[5/4] md:aspect-[3/4] relative border border-slate-950 mb-3">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="object-cover object-center absolute h-full left-0 right-0 top-0 bottom-0"
        />
      </div>
      <h3 className="scroll-m-20 text-lg md:text-2xl font-semibold tracking-tight">
        {property.title}
      </h3>
      <div className="space-y-2 md:space-y-3">
        <p className="text-sm">{property.location}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold">
            {formatPriceToCurrency(property.price)}{" "}
            <span className="font-normal">/night</span>
          </p>

          <div className="font-semibold flex items-center gap-1">
            <Star size={16} fill="black" />
            <span className="text-sm">{property.rating}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
