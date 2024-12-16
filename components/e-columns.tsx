'use client'

import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { Population2 } from '@/lib/typedef/display-population-typedef'
import { DataTableColumnHeader } from './e-data-table-column-header'
import { DataTableRowActions } from './e-data-table-row-actions'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Population2>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const isHouseholdHead = row.original.head === 'Yes'
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('name')}
          </span>
           {isHouseholdHead && <Badge variant="outline">{'Head'}</Badge>}
        </div>
      )
    },
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <div>{row.getValue('gender')}</div>,
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
    accessorKey: 'house',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="House No:" />
    ),
    cell: ({ row }) => <div>{row.getValue('house')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Birthdate" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span className="max-w-[500px] truncate">{row.original.birthdate}</span>
        <Badge variant="outline">{row.original.age}</Badge>
        <Badge variant="outline">{row.getValue('category')}</Badge>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div>{row.getValue('status')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'education',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Educational Att:" />
    ),
    cell: ({ row }) => <div>{row.getValue('education')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'occupation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Occupation" />
    ),
    cell: ({ row }) => <div>{row.getValue('occupation')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'income',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Add. Income" />
    ),
    cell: ({ row }) => <div>{row.getValue('income')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'nationality',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nationality" />
    ),
    cell: ({ row }) => <div>{row.getValue('nationality')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'religion',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Religion" />
    ),
    cell: ({ row }) => <div>{row.getValue('religion')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'ofw',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="OFW" />
    ),
    cell: ({ row }) => <div>{row.getValue('ofw')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'pwd',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PWD" />
    ),
    cell: ({ row }) => <div>{row.getValue('pwd')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'benefit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Benefit" />
    ),
    cell: ({ row }) => <div>{row.getValue('benefit')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'children',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Children" />
    ),
    cell: ({ row }) => <div>{row.getValue('children')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'iodized',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Iodized" />
    ),
    cell: ({ row }) => <div>{row.getValue('iodized')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'fortified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fortified" />
    ),
    cell: ({ row }) => <div>{row.getValue('fortified')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'housetype',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="House Type" />
    ),
    cell: ({ row }) => <div>{row.getValue('housetype')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'occupancy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Occupancy" />
    ),
    cell: ({ row }) => <div>{row.getValue('occupancy')}</div>,
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
    accessorKey: 'planning',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Family Planning" />
    ),
    cell: ({ row }) => <div>{row.getValue('planning')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'method',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Planning Method" />
    ),
    cell: ({ row }) => <div>{row.getValue('method')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'pregnant',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pregnant" />
    ),
    cell: ({ row }) => <div>{row.getValue('pregnant')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'lactating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lactating" />
    ),
    cell: ({ row }) => <div>{row.getValue('lactating')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'nursing',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nursing" />
    ),
    cell: ({ row }) => <div>{row.getValue('nursing')}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
