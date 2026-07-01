import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Award, Phone, Mail, GraduationCap, Briefcase, Languages, Coins, HeartPulse, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react'
import { doctors } from '@/lib/data'

export function generateStaticParams() {
  return doctors.map((doctor) => ({
    slug: doctor.slug,
  }))
}

// Fixed: Made params asynchronous for generateMetadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const doctor = doctors.find((d) => d.slug === resolvedParams.slug)
  return {
    title: `${doctor?.name} | ${doctor?.specialization} Expert`,
    description: doctor?.description,
  }
}

// Fixed: Made the component async and awaited params to solve the Next.js API Promise error
export default async function DoctorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const doctor = doctors.find((d) => d.slug === resolvedParams.slug)

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Doctor Profile Not Found</h1>
          <Link href="/doctors" className="text-primary hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back to Medical Staff
          </Link>
        </div>
      </div>
    )
  }

  // Profile URL context generation
  const profileUrl = `https://www.gdhealthcare.com/doctors/${doctor.slug}`

  return (
    <div className="w-full bg-muted/10 min-h-screen pb-16">
      
      {/* Top Breadcrumb Navigation */}
      <div className="bg-background border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/doctors" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 transition-colors">
            <ArrowLeft size={14} /> Back to Doctors Directory
          </Link>
        </div>
      </div>

      {/* Profile Header Hero Section */}
      <div className="bg-background border-b border-border pt-8 pb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            
            {/* Photo URL Display */}
            <div className="relative h-48 w-48 rounded-2xl overflow-hidden border border-border shadow-md bg-muted flex-shrink-0">
              <Image
                src={doctor.image}
                alt={`${doctor.name} Photo`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Core Summary */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">{doctor.name}</h1>
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                  {doctor.specialization}
                </span>
              </div>

              <p className="text-lg font-semibold text-muted-foreground">{doctor.subSpecialty}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-primary" />
                  <span><strong>Experience:</strong> {doctor.experience} Years active</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span><strong>Location:</strong> {doctor.city}, {doctor.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-primary" />
                  <span className="truncate"><strong>Dept:</strong> {doctor.department}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-950/40 px-3 py-1 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
                  <Star size={16} className="text-yellow-600 fill-yellow-600" />
                  <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">{doctor.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">Based on {doctor.reviews} patient checkups</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Biography & Experience Deep-dive */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Bio Section (500-700 words layout) */}
            <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-4 border-b pb-2">Medical Practitioner Biography</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line space-y-4 text-base">
                {doctor.longBio || doctor.description}
              </div>
            </section>

            {/* Areas of Expertise Grid */}
            {doctor.expertiseAreas && doctor.expertiseAreas.length > 0 && (
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <HeartPulse size={20} className="text-primary" />
                  Areas of Clinical Expertise
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {doctor.expertiseAreas.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 bg-muted/40 rounded-xl border border-border/60">
                      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Major Procedures Undertaken */}
            {doctor.majorProcedures && doctor.majorProcedures.length > 0 && (
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Major Interventional Procedures</h2>
                <div className="flex flex-wrap gap-2.5">
                  {doctor.majorProcedures.map((proc, idx) => (
                    <span key={idx} className="bg-muted text-foreground border border-border px-3 py-1.5 rounded-lg text-sm font-medium">
                      {proc}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* International Experience Matrix */}
            {doctor.intlExperience && doctor.intlExperience.length > 0 && (
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award size={20} className="text-primary" />
                  International Medical Tenures
                </h2>
                <ul className="space-y-3">
                  {doctor.intlExperience.map((exp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{exp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Professional Memberships */}
            {doctor.memberships && doctor.memberships.length > 0 && (
              <section className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-4">Professional Fellowships & Memberships</h2>
                <div className="space-y-2.5">
                  {doctor.memberships.map((member, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/40">
                      • {member}
                    </p>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Quick Specifications Sidebar */}
          <div className="space-y-6">
            
            {/* Consultation and Hospital Summary Box */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
              <h3 className="text-lg font-bold text-foreground pb-2 border-b">Practice Matrix</h3>
              
              {/* Consultation Fee (INR) */}
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider mb-1">
                  <Coins size={14} className="text-primary" />
                  Consultation Fee
                </div>
                <p className="text-2xl font-black text-foreground">
                  ₹{doctor.consultationFee.toLocaleString()} <span className="text-xs font-medium text-muted-foreground">INR / session</span>
                </p>
              </div>

              {/* Hospital Affiliation */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Primary Affiliation</p>
                <p className="text-sm font-bold text-foreground">{doctor.hospital}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{doctor.city}, {doctor.country}</p>
              </div>

              {/* Qualification details */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Qualifications</p>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed bg-muted p-2.5 rounded-lg border border-border/60">
                  {doctor.qualification}
                </p>
              </div>

              {/* Languages Spoken */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Languages size={14} /> Language Fluency
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.languages.map((lang, idx) => (
                    <span key={idx} className="text-xs font-semibold bg-muted text-foreground px-2.5 py-1 rounded-md border border-border">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Accolades & Awards */}
              {doctor.awards && doctor.awards.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Major Recognitions</p>
                  <div className="space-y-1.5">
                    {doctor.awards.map((award, idx) => (
                      <span key={idx} className="block text-[11px] font-medium text-amber-800 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-100 dark:border-amber-900/20 px-2 py-1 rounded">
                        🏆 {award}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Treatments Linking Context */}
              {doctor.recommendedTreatments && doctor.recommendedTreatments.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Specialized Treatments</p>
                  <div className="space-y-1">
                    {doctor.recommendedTreatments.map((treatSlug, idx) => (
                      <Link 
                        key={idx} 
                        href={`/treatments/${treatSlug}`}
                        className="block text-xs font-semibold text-primary hover:underline bg-primary/5 p-2 rounded border border-primary/10"
                      >
                        View Treatment Procedures →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Profile URL Metadata */}
              <div className="pt-2 border-t border-border">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Profile Reference URL</p>
                <span className="text-[11px] text-muted-foreground/80 font-mono break-all block p-1.5 bg-muted/60 rounded">
                  {profileUrl}
                </span>
              </div>

              {/* Interventions Schedule Action Panels */}
              <div className="space-y-2 pt-2">
                <button className="w-full px-4 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm">
                  Book Clinical Appointment
                </button>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-2.5 border border-primary/30 text-primary bg-primary/5 rounded-xl font-semibold hover:bg-primary/10 transition-colors text-sm"
                >
                  Consult on WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Informational Communication Panel */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                <ShieldAlert size={16} className="text-primary" /> Urgent Assistance
              </h4>
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  <span>Hotline: +91 9999 999 999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-primary" />
                  <span>Desk: info@gdhealthcare.com</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}