import Link from 'next/link'
import {
  Building2,
  Stethoscope,
  Pill,
  Globe,
  MessageSquareQuote,
  DollarSign,
  Package,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const DASHBOARD_ITEMS: { href: string; title: string; description: string; icon: LucideIcon }[] = [
  { href: '/admin/hospitals', title: 'Hospitals', description: 'Manage hospital listings', icon: Building2 },
  { href: '/admin/doctors', title: 'Doctors', description: 'Manage doctor profiles', icon: Stethoscope },
  { href: '/admin/treatments', title: 'Treatments', description: 'Manage treatments & pricing', icon: Pill },
  { href: '/admin/countries', title: 'Countries', description: 'Manage international patient countries', icon: Globe },
  { href: '/admin/patient-testimonials', title: 'Patient Testimonials', description: 'Share patient treatment stories', icon: MessageSquareQuote },
  { href: '/admin/cost-comparisons', title: 'Cost Comparison', description: 'Manage the India vs Western costs table', icon: DollarSign },
  { href: '/admin/medical-packages', title: 'Procedure Packages', description: 'Manage procedure package pricing', icon: Package },
  { href: '/admin/faqs', title: 'FAQs', description: 'Manage frequently asked questions', icon: HelpCircle },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Manage hospitals, doctors, treatments, countries, testimonials, and pricing.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_ITEMS.map(({ href, title, description, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="h-full transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <Icon className="h-6 w-6 text-primary mb-1" />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
