'use client'

import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Cross2Icon } from '@radix-ui/react-icons'
import { DataTableViewOptions } from './data-table-view-options'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { POPULATION_CONFIG } from '@/lib/config/POPULATION_CONFIG'


interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
      <Input
          placeholder="Filter owner's name..."
          value={(table.getColumn('owner')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('owner')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('establishment') && (
          <DataTableFacetedFilter
            column={table.getColumn('establishment')}
            title="Establishment"
            options={POPULATION_CONFIG.establishment_type}
          />
        )} 
        {table.getColumn('street') && (
          <DataTableFacetedFilter
            column={table.getColumn('street')}
            title="Street"
            options={POPULATION_CONFIG.streetOptions}
          />
        )}
         {table.getColumn('type') && (
          <DataTableFacetedFilter
            column={table.getColumn('type')}
            title="Bldg Type"
            options={POPULATION_CONFIG.type_of_bldg}
          />
        )}
         {table.getColumn('water') && (
          <DataTableFacetedFilter
            column={table.getColumn('water')}
            title="Water Source"
            options={POPULATION_CONFIG.water_source}
          />
        )}
         {table.getColumn('toilet') && (
          <DataTableFacetedFilter
            column={table.getColumn('toilet')}
            title="Toilet Type"
            options={POPULATION_CONFIG.toilet_type}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
