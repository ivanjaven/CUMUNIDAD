import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EditSheet } from '@/components/e-edit-sheet'
import { DisplayPopulationTypedef } from '@/lib/typedef/display-population-typedef'
import { z } from 'zod'
import { DeleteDialog } from '@/components/e-delete-dialog'

type PopulationData2 = z.infer<typeof DisplayPopulationTypedef>

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  onEdit?: (updatedData: PopulationData2) => void
  onDelete?: (id: number) => void
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const person = DisplayPopulationTypedef.parse(row.original)

  const handleCloseSheet = () => {
    setIsEditSheetOpen(false)
    // Ensure dropdown is closed when sheet closes
    setIsDropdownOpen(false)
  }

  const handleConfirmDelete = () => {
    const residentId = Number(person.resid)

    if (!isNaN(residentId)) { 
      onDelete?.(residentId)
    } else {
      console.error('Invalid resident_id: not a number')
    }
  
    setIsDeleteDialogOpen(false)
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              setIsEditSheetOpen(true)
              setIsDropdownOpen(false)
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsDeleteDialogOpen(true)
              setIsDropdownOpen(false)
            }}
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditSheet
        isOpen={isEditSheetOpen}
        onClose={handleCloseSheet}
        query={Number(person.resid)} 
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        personId={Number(person.resid)} 
        personName={person.name}
      />
    </>
  )
}