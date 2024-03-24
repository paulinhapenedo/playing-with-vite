import { propertiesMock } from "@/api/properties";
import { PropertyCard } from "../PropertyCard";
import { strings } from "./strings";

export function PropertyList() {
  return (
    <section className="px-4 md:px-8 flex flex-1">
      <div className="border-x border-slate-950 w-full flex flex-col p-6 space-y-8">
        <h2 className="scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight mt-4 md:mt-8">
          {strings.sectionTitle}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 max-w-sm md:max-w-screen-xl">
          {propertiesMock.map((property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
