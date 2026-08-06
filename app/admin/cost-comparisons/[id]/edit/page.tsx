import { notFound } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import CostComparison, { type ICostComparison } from '@/lib/models/CostComparison'
import { CostComparisonForm } from '@/app/admin/cost-comparisons/CostComparisonForm'
import { updateCostComparison } from '@/app/actions/cost-comparisons'

export const dynamic = 'force-dynamic'

export default async function EditCostComparisonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const item = await CostComparison.findById(id).lean<ICostComparison>()

  if (!item) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit {item.name}</h1>
      <CostComparisonForm action={updateCostComparison.bind(null, id)} item={item} />
    </div>
  )
}
