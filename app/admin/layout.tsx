import { AdminSessionProvider } from '@/components/admin/AdminSessionProvider'
import { AdminShell } from '@/components/admin/AdminShell'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminSessionProvider>
      <AdminShell>{children}</AdminShell>
    </AdminSessionProvider>
  )
}