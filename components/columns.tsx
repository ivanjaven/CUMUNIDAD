'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Population } from '@/lib/typedef/population-typedef'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Population>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'owner',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('owner')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'establishment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Establishment" />
    ),
    cell: ({ row }) => <div>{row.getValue('establishment')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: 'street',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Street" />
    ),
    cell: ({ row }) => <div>{row.getValue('street')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
 
  {
    accessorKey: 'bld_no',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bldg No:" />
    ),
    cell: ({ row }) => <div>{row.getValue('bld_no')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },



  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bldg Type" />
    ),
    cell: ({ row }) => <div>{row.getValue('type')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'water',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Water Source" />
    ),
    cell: ({ row }) => <div>{row.getValue('water')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'toilet',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Toilet Type" />
    ),
    cell: ({ row }) => <div>{row.getValue('toilet')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
