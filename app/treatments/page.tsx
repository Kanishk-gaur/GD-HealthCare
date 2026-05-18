import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { treatments } from '@/lib/data'

export const metadata = {
  title: 'Medical Treatments | GD Healthcare',
  description: 'Explore our wide range of medical treatments and surgical procedures with world-class doctors.',
}

export default function TreatmentsPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Medical Treatments</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive range of treatments from top hospitals and experienced doctors
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search treatments..."
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Categories</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>Neurosurgery</option>
              <option>Oncology</option>
              <option>Dentistry</option>
            </select>
          </div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <Link
                key={treatment.id}
                href={`/treatments/${treatment.slug}`}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-border hover:border-primary group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={treatment.image}
                    alt={treatment.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-primary text-sm font-semibold mb-2">{treatment.category}</p>
                  <h3 className="text-xl font-semibold mb-2">{treatment.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{treatment.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="p-3 bg-muted/20 rounded">
                      <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                      <p className="font-bold text-foreground">{treatment.successRate}%</p>
                    </div>
                    <div className="p-3 bg-muted/20 rounded">
                      <p className="text-xs text-muted-foreground mb-1">Avg Cost</p>
                      <p className="font-bold text-primary">${treatment.avgCost.min.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {treatment.hospitals.slice(0, 2).map((hospital, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {hospital}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find your treatment?</h2>
          <p className="text-lg text-white/90 mb-8">Contact our medical experts to discuss your specific needs.</p>
          <a
            href="/contact"
            className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors inline-block"
          >
            Get Expert Advice
          </a>
        </div>
      </section>
    </div>
  )
}
