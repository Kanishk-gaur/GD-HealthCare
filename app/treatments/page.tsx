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
        <h1 className="text-3xl font-bold tracking-tight">Medical Treatments</h1>
        <p className="text-muted-foreground mt-2">
          Explore world-class healthcare procedures available across Delhi NCR.
        </p>
      </div>

      {/* Main Grid: Standardized 4 column configuration to narrow the Treatment Card width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {MOCK_TREATMENTS.map((treatment) => (
          <Card 
            key={treatment.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden border border-muted flex flex-col mx-auto w-full max-w-sm"
            onClick={() => setSelectedTreatment(treatment)}
          >
            {/* Increased Thumbnail Height (h-64) */}
            <div className="relative w-full h-64 bg-muted">
              <Image
                src={treatment.thumbnailUrl}
                alt={treatment.name}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-primary text-white">
                {treatment.category}
              </Badge>
            </div>
            
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-semibold line-clamp-1">
                {treatment.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-between">
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                {treatment.description}
              </p>
              
              <div className="border-t pt-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground block">Starting From</span>
                  <span className="font-semibold text-primary">
                    ₹{treatment.startingCostINR.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground block">Global Cost</span>
                  <span className="font-semibold text-emerald-600">
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
                <Badge variant="outline" className="text-xs">
                  {selectedTreatment.category}
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 gap-1 border-0">
                  <Percent className="w-3 h-3" /> {selectedTreatment.successRate} Success Rate
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {selectedTreatment.name}
              </DialogTitle>
            </DialogHeader>

            {/* Timings and Stats */}
            <div className="grid grid-cols-2 gap-4 my-4 bg-muted/40 p-4 rounded-xl border border-muted">
              <div>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5" /> Recovery Timeline
                </span>
                <p className="text-sm font-medium">{selectedTreatment.recoveryTime}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5" /> Hospital Stay Required
                </span>
                <p className="text-sm font-medium">{selectedTreatment.hospitalStay}</p>
              </div>
            </div>

            {/* Financial Estimates Segment */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" /> Financial Estimates
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg bg-card">
                  <span className="text-xs text-muted-foreground block mb-0.5">Domestic Cost (INR)</span>
                  <p className="text-sm font-medium text-foreground">
                    Starting: <span className="text-primary font-semibold">₹{selectedTreatment.startingCostINR.toLocaleString("en-IN")}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Avg. Package: ₹{selectedTreatment.averageCostINR.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-3 border rounded-lg bg-card">
                  <span className="text-xs text-muted-foreground block mb-0.5">International Cost (USD)</span>
                  <p className="text-sm font-medium text-foreground">
                    Starting: <span className="text-emerald-600 font-semibold">${selectedTreatment.startingCostUSD.toLocaleString("en-US")}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Avg. Package: ${selectedTreatment.averageCostUSD.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            </div>

            {/* Patient Friendly Copy */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">About the Treatment</h3>
              <DialogDescription className="text-sm leading-relaxed text-foreground/80 text-justify">
                {selectedTreatment.description}
              </DialogDescription>
            </div>

            {/* Hospitals and Doctors recommendations split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Recommended Centers (Delhi NCR)
                </h4>
                <ul className="space-y-1.5 text-sm">
                  {selectedTreatment.recommendedHospitals.map((hospital, index) => (
                    <li key={index} className="text-foreground/90 flex items-start gap-1">
                      <span className="text-primary font-bold">•</span> {hospital}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" /> Panel Specialists
                </h4>
                <ul className="space-y-1.5 text-sm">
                  {selectedTreatment.recommendedDoctors.map((doctor, index) => (
                    <li key={index} className="text-foreground/90 flex items-start gap-1">
                      <span className="text-emerald-600 font-bold">•</span> {doctor}
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