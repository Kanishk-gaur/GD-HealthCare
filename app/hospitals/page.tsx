"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Bed } from "lucide-react";
import { hospitals } from "@/lib/data";

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");

  // Get unique countries for filter dropdown
  const countries = useMemo(() => {
    const unique = new Set(hospitals.map((h) => h.country));
    return ["All Countries", ...Array.from(unique)];
  }, []);

  // Filter hospitals based on search and country
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      // Search filter (name, city, country, description, specializations)
      const searchMatch =
        searchTerm === "" ||
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.specializations.some((spec) =>
          spec.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      // Country filter
      const countryMatch =
        selectedCountry === "All Countries" ||
        hospital.country === selectedCountry;

      return searchMatch && countryMatch;
    });
  }, [searchTerm, selectedCountry]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Partner Hospitals</h1>
          <p className="text-lg text-muted-foreground">
            Discover world-class healthcare facilities with expert doctors and
            advanced medical technology
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Hospitals Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredHospitals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No hospitals found matching your criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCountry("All Countries");
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHospitals.map((hospital) => (
                <Link
                  key={hospital.id}
                  href={`/hospitals/${hospital.slug}`}
                  className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-border hover:border-primary group flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={hospital.image}
                      alt={hospital.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold pr-2 line-clamp-2">
                        {hospital.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded flex-shrink-0">
                        <Star
                          size={16}
                          className="text-yellow-600 fill-yellow-600"
                        />
                        <span className="text-sm font-semibold text-yellow-600">
                          {hospital.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <MapPin size={16} />
                      <span className="text-sm">
                        {hospital.city || hospital.country}, {hospital.country}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {hospital.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                      <Bed size={16} />
                      <span>{hospital.beds} beds</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hospital.specializations.slice(0, 2).map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                      {hospital.specializations.length > 2 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{hospital.specializations.length - 2} more
                        </span>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border mt-auto">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          Avg. Cost:
                        </span>{" "}
                        ${hospital.avgCost.min.toLocaleString()} - $
                        {hospital.avgCost.max.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
