// app/treatments/page.tsx
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

// Import your newly moved items directly
import { MOCK_TREATMENTS, Treatment } from "@/lib/data";

export default function TreatmentsPage() {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

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

      {/* Main Grid: Standardized 4 column configuration to narrow the Treatment Card width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {MOCK_TREATMENTS.map((treatment) => (
          <Card 
            key={treatment.id}
            className="cursor-pointer hover:shadow-lg hover:shadow-[#ff4c88]/10 transition-all duration-200 overflow-hidden border border-[#ffa649]/10 flex flex-col mx-auto w-full max-w-sm hover:border-[#ffa649] group"
            onClick={() => setSelectedTreatment(treatment)}
          >
            {/* Increased Thumbnail Height (h-64) */}
            <div className="relative w-full h-64 bg-muted">
              <Image
                src={treatment.thumbnailUrl}
                alt={treatment.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-[#ffa649] to-[#ff4c88] text-white border-0">
                {treatment.category}
              </Badge>
            </div>
            
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-[#ff4c88] transition-colors">
                {treatment.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-between">
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                {treatment.description}
              </p>
              
              <div className="border-t border-[#ffa649]/10 pt-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block">Starting From</span>
                  <span className="font-semibold text-[#ffa649]">
                    ₹{treatment.startingCostINR.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground block">Global Cost</span>
                  <span className="font-semibold text-[#ff4c88]">
                    ${treatment.startingCostUSD.toLocaleString("en-US")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Treatment Overlay Modal Panel */}
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