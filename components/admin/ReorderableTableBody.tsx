'use client'

import { useEffect, useState, useTransition, type ReactNode } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { TableBody, TableRow, TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface ReorderableTableBodyProps<T extends { _id?: string }> {
  items: T[]
  onReorder: (orderedIds: string[]) => Promise<void>
  renderRow: (item: T) => ReactNode
}

/**
 * Drag-and-drop row reordering for an admin Table. Reorders optimistically
 * on the client, then persists via `onReorder` (a server action writing the
 * new array index as each item's `order` field) — see lib/reorder.ts.
 */
export function ReorderableTableBody<T extends { _id?: string }>({
  items,
  onReorder,
  renderRow,
}: ReorderableTableBodyProps<T>) {
  const [ordered, setOrdered] = useState(items)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setOrdered(items)
  }, [items])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = ordered.findIndex((item) => String(item._id) === active.id)
    const newIndex = ordered.findIndex((item) => String(item._id) === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const next = arrayMove(ordered, oldIndex, newIndex)
    setOrdered(next)
    startTransition(() => {
      onReorder(next.map((item) => String(item._id)))
    })
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={ordered.map((item) => String(item._id))}
        strategy={verticalListSortingStrategy}
      >
        <TableBody className={cn(isPending && 'opacity-60 transition-opacity')}>
          {ordered.map((item) => (
            <SortableRow key={String(item._id)} id={String(item._id)}>
              {renderRow(item)}
            </SortableRow>
          ))}
        </TableBody>
      </SortableContext>
    </DndContext>
  )
}

function SortableRow({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(isDragging && 'relative z-10 bg-muted shadow-lg')}
    >
      <TableCell className="w-8 px-1">
        <button
          type="button"
          className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </TableCell>
      {children}
    </TableRow>
  )
}
