import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Plus, Printer } from 'lucide-react'  
import { toast } from 'sonner'
import { generatePDF } from '@/lib/pdf-generator'
import { Population } from '@/lib/typedef/population-typedef'
import { useState } from 'react'
import { AddEstablishment } from './addEstablisment'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = useState(false)

  const handlePrint = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    if (selectedRows.length === 0) {
      toast.error('Please select at least one row to print', {
        description: new Date().toLocaleString(),
        action: { label: 'Undo', onClick: () => console.log('Undo') },
      })
      return
    }

    const visibleColumns = table
      .getAllColumns()
      .filter((column) => column.getIsVisible())
      .map((column) => column.id)

    const data = selectedRows.map((row) => row.original as Population)
    generatePDF(data, visibleColumns)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={() => setOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
      <AddEstablishment open={open} setOpen={setOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="hidden h-8 lg:flex"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide(),
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id === 'bld_no' ? 'Bldg No:' : column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={handlePrint}
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
    </div>
  )
}