'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </div>
  )
}