import type { Model } from 'mongoose'

/** Persists a drag-and-drop reorder by writing each id's array index as its `order`. */
export async function bulkReorder(model: Model<any>, orderedIds: string[]) {
  if (orderedIds.length === 0) return
  await model.bulkWrite(
    orderedIds.map((id, index) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
    }))
  )
}
