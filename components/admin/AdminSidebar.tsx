'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/hospitals', label: 'Hospitals' },
  { href: '/admin/doctors', label: 'Doctors' },
  { href: '/admin/treatments', label: 'Treatments' },
  { href: '/admin/countries', label: 'Countries' },
  { href: '/admin/patient-testimonials', label: 'Patient Testimonials' },
  { href: '/admin/cost-comparisons', label: 'Cost Comparison' },
  { href: '/admin/medical-packages', label: 'Procedure Packages' },
  { href: '/admin/faqs', label: 'FAQs' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 border-r bg-muted/30 flex flex-col justify-between min-h-screen">
      <div>
        <div className="px-4 py-5 border-b flex items-center gap-2">
          <Image src="/1.png" alt="GD Healthcare" width={28} height={28} className="w-7 h-7 object-contain shrink-0" />
          <div>
            <p className="font-semibold text-sm">GD Healthcare</p>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
        <nav className="p-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground/80'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-3 border-t">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
        >
          Sign out
        </Button>
      </div>
    </aside>
  )
}