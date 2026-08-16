import { connectToDatabase } from "@/lib/mongodb";
import Treatment from "@/lib/models/Treatment";
import Hospital from "@/lib/models/Hospital";
import Doctor from "@/lib/models/Doctor";
import { TreatmentsClient, type DisplayTreatment } from "./TreatmentsClient";

export const revalidate = 0;

export default async function TreatmentsPage() {
  await connectToDatabase();

  const [treatments, hospitals, doctors] = await Promise.all([
    Treatment.find().sort({ order: 1 }).lean(),
    Hospital.find().select("slug name").lean<{ slug: string; name: string }[]>(),
    Doctor.find().select("slug name").lean<{ slug: string; name: string }[]>(),
  ]);

  const hospitalNameBySlug = new Map(hospitals.map((h) => [h.slug, h.name]));
  const doctorNameBySlug = new Map(doctors.map((d) => [d.slug, d.name]));

  const displayTreatments: DisplayTreatment[] = JSON.parse(JSON.stringify(treatments)).map(
    (t: { recommendedHospitalSlugs: string[]; recommendedDoctorSlugs: string[] }) => ({
      ...t,
      recommendedHospitals: t.recommendedHospitalSlugs
        .map((slug: string) => hospitalNameBySlug.get(slug))
        .filter(Boolean),
      recommendedDoctors: t.recommendedDoctorSlugs
        .map((slug: string) => doctorNameBySlug.get(slug))
        .filter(Boolean),
    })
  );

  return <TreatmentsClient treatments={displayTreatments} />;
}
