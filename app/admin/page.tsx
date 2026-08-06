import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Manage hospitals, doctors, treatments, and patient testimonials.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Hospitals</CardTitle>
            <CardDescription>Manage hospital listings</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Doctors</CardTitle>
            <CardDescription>Manage doctor profiles</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Treatments</CardTitle>
            <CardDescription>Manage treatments & pricing</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Testimonials</CardTitle>
            <CardDescription>Share patient treatment stories</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}