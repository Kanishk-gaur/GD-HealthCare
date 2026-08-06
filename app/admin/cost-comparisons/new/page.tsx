import { CostComparisonForm } from '@/app/admin/cost-comparisons/CostComparisonForm'
import { createCostComparison } from '@/app/actions/cost-comparisons'

export default function NewCostComparisonPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add procedure to cost comparison</h1>
      <CostComparisonForm action={createCostComparison} />
    </div>
  )
}
