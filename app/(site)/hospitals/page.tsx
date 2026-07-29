import { connectToDatabase } from "@/lib/mongodb";
import Hospital from "@/lib/models/Hospital";
import { HospitalsClient } from "./HospitalsClient";

// Public content changes whenever the admin edits it — don't cache a stale
// build-time snapshot.
export const revalidate = 0;

export default async function HospitalsPage() {
  await connectToDatabase();
  const hospitals = await Hospital.find().sort({ name: 1 }).lean();

  // Mongoose lean() docs contain ObjectId/Date instances, which aren't
  // serializable across the Server -> Client component boundary as-is.
  const serialized = JSON.parse(JSON.stringify(hospitals));

  return <HospitalsClient hospitals={serialized} />;
}
