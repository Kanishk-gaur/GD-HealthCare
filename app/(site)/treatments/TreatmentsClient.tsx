"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Building2, 
  UserCheck, 
  DollarSign, 
  Percent, 
  Activity 
} from "lucide-react";
import type { ITreatment } from "@/lib/models/Treatment";

// Same shape as the DB model, but with hospital/doctor slugs already
// resolved to display names server-side (see page.tsx), so this component
// doesn't need to know about slugs at all.
export type DisplayTreatment = Omit<
  ITreatment,
  "_id" | "createdAt" | "updatedAt" | "recommendedHospitalSlugs" | "recommendedDoctorSlugs"
> & {
  _id: string;
  recommendedHospitals: string[];
  recommendedDoctors: string[];
};

export function TreatmentsClient({ treatments }: { treatments: DisplayTreatment[] }) {
  const [selectedTreatment, setSelectedTreatment] = useState<DisplayTreatment | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (slug: string) => {
    setImageErrors(prev => new Set(prev).add(slug));
  };

  // Helper to get fallback gradient based on category
  const getCategoryGradient = (category: string): string => {
    const gradients: Record<string, string> = {
      "Cardiac Surgery": "from-red-500 to-red-700",
      "Interventional Cardiology": "from-blue-500 to-blue-700",
      "Orthopaedics": "from-green-500 to-green-700",
      "Spine Surgery": "from-indigo-500 to-indigo-700",
      "Transplant Surgery": "from-purple-500 to-purple-700",
      "Oncology": "from-pink-500 to-pink-700",
      "Radiation Oncology": "from-cyan-500 to-cyan-700",
      "Neurosciences": "from-violet-500 to-violet-700",
      "Functional Neurosurgery": "from-sky-500 to-sky-700",
      "Uro-Oncology": "from-teal-500 to-teal-700",
      "Surgical Oncology": "from-rose-500 to-rose-700",
      "Reproductive Medicine": "from-yellow-500 to-yellow-700",
      "Cosmetic Surgery": "from-orange-500 to-orange-700",
      "Dental": "from-emerald-500 to-emerald-700",
      "Bariatric Surgery": "from-red-500 to-red-700",
      "Ophthalmology": "from-blue-500 to-blue-700",
      "Cardiac Diagnostics": "from-gray-500 to-gray-700",
    };
    return gradients[category] || "from-gray-500 to-gray-700";
  };

  // Helper to get category color for fallback
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "Cardiac Surgery": "bg-red-500",
      "Interventional Cardiology": "bg-blue-500",
      "Orthopaedics": "bg-green-500",
      "Spine Surgery": "bg-indigo-500",
      "Transplant Surgery": "bg-purple-500",
      "Oncology": "bg-pink-500",
      "Radiation Oncology": "bg-cyan-500",
      "Neurosciences": "bg-violet-500",
      "Functional Neurosurgery": "bg-sky-500",
      "Uro-Oncology": "bg-teal-500",
      "Surgical Oncology": "bg-rose-500",
      "Reproductive Medicine": "bg-yellow-500",
      "Cosmetic Surgery": "bg-orange-500",
      "Dental": "bg-emerald-500",
      "Bariatric Surgery": "bg-red-500",
      "Ophthalmology": "bg-blue-500",
      "Cardiac Diagnostics": "bg-gray-500",
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
            Medical Treatments
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore world-class healthcare procedures available across Delhi NCR.
        </p>
      </div>

      {/* Main Grid: 4 column configuration with square images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {treatments.map((treatment) => {
          const hasError = imageErrors.has(treatment.slug);

          return (
            <Card 
              key={treatment._id}
              className="cursor-pointer hover:shadow-lg hover:shadow-[#ff4c88]/10 transition-all duration-200 overflow-hidden border border-[#ffa649]/10 flex flex-col hover:border-[#ffa649] group"
              onClick={() => setSelectedTreatment(treatment)}
            >
              {/* Square Thumbnail Container - maintains 1:1 aspect ratio with no extra spacing */}
              <div className="relative w-full aspect-square bg-gradient-to-br from-[#ffa649]/10 to-[#ff4c88]/10 overflow-hidden flex-shrink-0">
                {hasError ? (
                  // Fallback UI if image fails to load
                  <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-[#ffa649]/20 to-[#ff4c88]/20">
                    <div className="text-center">
                      <div className={`w-20 h-20 mx-auto mb-3 rounded-full ${getCategoryColor(treatment.category)} flex items-center justify-center shadow-lg`}>
                        <span className="text-3xl text-white font-bold">
                          {treatment.name.charAt(0)}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/70 line-clamp-2 font-medium max-w-[150px] mx-auto">
                        {treatment.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Image
                      src={treatment.thumbnailUrl}
                      alt={treatment.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                      onError={() => handleImageError(treatment.slug)}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      priority={false}
                      quality={85}
                    />
                    {/* Subtle overlay gradient at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </>
                )}
                
                {/* Category Badge - positioned at bottom left */}
                <Badge className="absolute bottom-3 left-3 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white border-0 z-10 shadow-lg text-xs px-2 py-0.5">
                  {treatment.category}
                </Badge>
              </div>
              
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-base font-semibold line-clamp-1 group-hover:text-[#ff4c88] transition-colors">
                  {treatment.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-3 pt-0 flex-1 flex flex-col justify-between">
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {treatment.description}
                </p>
                
                <div className="border-t border-[#ffa649]/10 pt-2 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Starting From</span>
                    <span className="font-semibold text-[#ffa649] text-sm">
                      ₹{treatment.startingCostINR.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground block">Global Cost</span>
                    <span className="font-semibold text-[#ff4c88] text-sm">
                      ${treatment.startingCostUSD.toLocaleString("en-US")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Treatment Overlay Modal Panel - No Image */}
      <Dialog 
        open={selectedTreatment !== null} 
        onOpenChange={(open) => !open && setSelectedTreatment(null)}
      >
        {selectedTreatment && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg p-6">
            <DialogHeader className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs border-[#ffa649]/30 text-[#ff4c88]">
                  {selectedTreatment.category}
                </Badge>
                <Badge className="bg-gradient-to-r from-[#ffa649]/10 to-[#ff4c88]/10 text-[#ff4c88] gap-1 border border-[#ffa649]/20">
                  <Percent className="w-3 h-3" /> {selectedTreatment.successRate} Success Rate
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                {selectedTreatment.name}
              </DialogTitle>
            </DialogHeader>

            {/* Timings and Stats */}
            <div className="grid grid-cols-2 gap-4 my-4 bg-gradient-to-r from-[#ffa649]/5 to-[#ff4c88]/5 p-4 rounded-xl border border-[#ffa649]/10">
              <div>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#ffa649]" /> Recovery Timeline
                </span>
                <p className="text-sm font-medium">{selectedTreatment.recoveryTime}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5 text-[#ffa649]" /> Hospital Stay Required
                </span>
                <p className="text-sm font-medium">{selectedTreatment.hospitalStay}</p>
              </div>
            </div>

            {/* Financial Estimates Segment */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#ffa649]" /> 
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  Financial Estimates
                </span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-[#ffa649]/10 rounded-lg bg-card">
                  <span className="text-xs text-muted-foreground block mb-0.5">Domestic Cost (INR)</span>
                  <p className="text-sm font-medium text-foreground">
                    Starting: <span className="text-[#ffa649] font-semibold">₹{selectedTreatment.startingCostINR.toLocaleString("en-IN")}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Avg. Package: ₹{selectedTreatment.averageCostINR.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-3 border border-[#ffa649]/10 rounded-lg bg-card">
                  <span className="text-xs text-muted-foreground block mb-0.5">International Cost (USD)</span>
                  <p className="text-sm font-medium text-foreground">
                    Starting: <span className="text-[#ff4c88] font-semibold">${selectedTreatment.startingCostUSD.toLocaleString("en-US")}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Avg. Package: ${selectedTreatment.averageCostUSD.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            </div>

            {/* Patient Friendly Copy */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">
                <span className="bg-gradient-to-r from-[#ffa649] to-[#ff4c88] bg-clip-text text-transparent">
                  About the Treatment
                </span>
              </h3>
              <DialogDescription className="text-sm leading-relaxed text-foreground/80 text-justify">
                {selectedTreatment.description}
              </DialogDescription>
            </div>

            {/* Hospitals and Doctors recommendations split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#ffa649]/10 pt-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#ffa649]" /> Recommended Centers (Delhi NCR)
                </h4>
                <ul className="space-y-1.5 text-sm">
                  {selectedTreatment.recommendedHospitals.map((hospital, index) => (
                    <li key={index} className="text-foreground/90 flex items-start gap-1">
                      <span className="text-[#ffa649] font-bold">•</span> {hospital}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#ff4c88]" /> Panel Specialists
                </h4>
                <ul className="space-y-1.5 text-sm">
                  {selectedTreatment.recommendedDoctors.map((doctor, index) => (
                    <li key={index} className="text-foreground/90 flex items-start gap-1">
                      <span className="text-[#ff4c88] font-bold">•</span> {doctor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}