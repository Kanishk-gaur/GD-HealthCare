"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Bed, Search, Filter, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import type { IHospital } from "@/lib/models/Hospital";

type SerializedHospital = Omit<IHospital, "_id" | "createdAt" | "updatedAt"> & {
  _id: string;
};

export function HospitalsClient({ hospitals }: { hospitals: SerializedHospital[] }) {
  const { translate } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");

  // Get unique countries for filter dropdown
  const countries = useMemo(() => {
    const unique = new Set(hospitals.map((h) => h.country));
    return ["All Countries", ...Array.from(unique)];
  }, [hospitals]);

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
  }, [searchTerm, selectedCountry, hospitals]);

  return (
    <div className="w-full">
      {/* Header - Updated Gradient */}
      <section className="relative bg-gradient-to-br from-[#ffa649]/10 via-white to-[#ff4c88]/10 py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-[#ffa649]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-[#ff4c88]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
              {translate("Our Partner Hospitals")}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {translate(
              "Discover world-class healthcare facilities with expert doctors and advanced medical technology across the globe"
            )}
          </p>
          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#ff4c88]">
                {hospitals.length}
              </span>
              <span className="text-sm text-muted-foreground">{translate("Partner Hospitals")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#ffa649]">
                {countries.length - 1}
              </span>
              <span className="text-sm text-muted-foreground">{translate("Countries")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section - Updated */}
      <section className="py-6 border-b border-[#ffa649]/10 bg-white/50 backdrop-blur-sm sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3 text-[#ffa649]" />
              <input
                type="text"
                placeholder={translate("Search hospitals by name, city, country, or specialty...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffa649] focus:border-transparent bg-card transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-[#ff4c88] transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="relative md:w-64">
              <Filter size={18} className="absolute left-3 top-3 text-[#ffa649]" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffa649] focus:border-transparent bg-card appearance-none transition-all duration-300"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {translate(country)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Hospitals Grid - Updated */}
      <section className="py-16 bg-gradient-to-b from-white to-[#ffa649]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results count */}
          <div className="mb-6 text-sm text-muted-foreground">
            <span className="font-semibold text-[#ff4c88]">{filteredHospitals.length}</span> {translate("hospitals found")}
          </div>

          {filteredHospitals.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#ffa649]/20 shadow-sm">
              <div className="text-6xl mb-4">🏥</div>
              <p className="text-lg text-muted-foreground mb-4">
                {translate("No hospitals found matching your criteria")}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCountry("All Countries");
                }}
                className="px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white hover:shadow-lg hover:shadow-[#ff4c88]/30 transition-all duration-300 hover:scale-105"
              >
                {translate("Clear filters")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHospitals.map((hospital) => (
                <Link
                  key={hospital._id}
                  href={`/hospitals/${hospital.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border hover:border-[#ffa649] group flex flex-col transform hover:-translate-y-1"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={hospital.image}
                      alt={translate(hospital.name)}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Rating Badge on Image */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-gray-800">{hospital.rating}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-[#ff4c88] transition-colors">
                      {translate(hospital.name)}
                    </h3>

                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <MapPin size={16} className="text-[#ffa649]" />
                      <span className="text-sm">
                        {translate(hospital.city || hospital.country)}, {translate(hospital.country)}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {translate(hospital.description)}
                    </p>

                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                      <Bed size={16} className="text-[#ff4c88]" />
                      <span>{hospital.beds} {translate("beds")}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hospital.specializations.slice(0, 2).map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 text-[#ff4c88] px-3 py-1 rounded-full font-medium"
                        >
                          {translate(spec)}
                        </span>
                      ))}
                      {hospital.specializations.length > 2 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{hospital.specializations.length - 2} {translate("more")}
                        </span>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#ffa649]/10 mt-auto">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">{translate("Avg. Cost:")}</span>
                        </p>
                        <p className="text-sm font-bold bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                          ${hospital.avgCost.min.toLocaleString()} - ${hospital.avgCost.max.toLocaleString()}
                        </p>
                      </div>
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