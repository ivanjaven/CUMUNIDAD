'use client'

import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Cross2Icon } from '@radix-ui/react-icons'
import { DataTableViewOptions } from './e-data-table-view-options'
import { DataTableFacetedFilter } from './e-data-table-faceted-filter'
import { POPULATION_CONFIG } from '@/lib/config/POPULATION_CONFIG'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex w-full items-start justify-between">
  <div className="max-w-[1500px]">
        <div className="flex flex-wrap gap-2">
          <Input
            placeholder="Filter names..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />

          {table.getColumn('gender') && (
            <DataTableFacetedFilter
              column={table.getColumn('gender')}
              title="Gender"
              options={POPULATION_CONFIG.genderOptions}
            />
          )}

          {table.getColumn('street') && (
            <DataTableFacetedFilter
              column={table.getColumn('street')}
              title="Street"
              options={POPULATION_CONFIG.streetOptions}
            />
          )}
        
          {table.getColumn('category') && (
            <DataTableFacetedFilter
              column={table.getColumn('category')}
              title="Age Category"
              options={POPULATION_CONFIG.ageCategoryOptions}
            />
          )}
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title="Status"
              options={POPULATION_CONFIG.statusOptions}
            />
          )}
          {table.getColumn('education') && (
            <DataTableFacetedFilter
              column={table.getColumn('education')}
              title="Educational Att:"
              options={POPULATION_CONFIG.educational_att}
            />
          )}
          {table.getColumn('occupation') && (
            <DataTableFacetedFilter
              column={table.getColumn('occupation')}
              title="Occupation"
              options={POPULATION_CONFIG.occupationOptions}
            />
          )}
          {table.getColumn('income') && (
            <DataTableFacetedFilter
              column={table.getColumn('income')}
              title="Add. Income"
              options={POPULATION_CONFIG.additional_income}
            />
          )}
          {table.getColumn('nationality') && (
            <DataTableFacetedFilter
              column={table.getColumn('nationality')}
              title="Nationality"
              options={POPULATION_CONFIG.nationality}
            />
          )}
          {table.getColumn('religion') && (
            <DataTableFacetedFilter
              column={table.getColumn('religion')}
              title="Religion"
              options={POPULATION_CONFIG.religions}
            />
          )}
          {table.getColumn('ofw') && (
            <DataTableFacetedFilter
              column={table.getColumn('ofw')}
              title="OFW"
              options={POPULATION_CONFIG.answer1}
            />
          )}
          {table.getColumn('pwd') && (
            <DataTableFacetedFilter
              column={table.getColumn('pwd')}
              title="PWD"
              options={POPULATION_CONFIG.answer1}
            />
          )}
          {table.getColumn('benefit') && (
            <DataTableFacetedFilter
              column={table.getColumn('benefit')}
              title="Benefit"
              options={POPULATION_CONFIG.benefits}
            />
          )}
          {table.getColumn('iodized') && (
            <DataTableFacetedFilter
              column={table.getColumn('iodized')}
              title="Iodized"
              options={POPULATION_CONFIG.answer1}
            />
          )}
          {table.getColumn('fortified') && (
            <DataTableFacetedFilter
              column={table.getColumn('fortified')}
              title="Fortified"
              options={POPULATION_CONFIG.answer1}
            />
          )}
          {table.getColumn('housetype') && (
            <DataTableFacetedFilter
              column={table.getColumn('housetype')}
              title="House Type"
              options={POPULATION_CONFIG.type_of_bldg}
            />
          )}
          {table.getColumn('occupancy') && (
            <DataTableFacetedFilter
              column={table.getColumn('occupancy')}
              title="Occupancy"
              options={POPULATION_CONFIG.housing_status}
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
          {table.getColumn('planning') && (
            <DataTableFacetedFilter
              column={table.getColumn('planning')}
              title="Family Planning"
              options={POPULATION_CONFIG.answer1}
            />
          )}
          {table.getColumn('method') && (
            <DataTableFacetedFilter
              column={table.getColumn('method')}
              title="Planning Method"
              options={POPULATION_CONFIG.family_planning_method}
            />
          )}
          {table.getColumn('pregnant') && (
            <DataTableFacetedFilter
              column={table.getColumn('pregnant')}
              title="Pregnant"
              options={POPULATION_CONFIG.answer1}
            />
          )}
          {table.getColumn('lactating') && (
            <DataTableFacetedFilter
              column={table.getColumn('lactating')}
              title="Lactating"
              options={POPULATION_CONFIG.answer1}
            />
          )}
          {table.getColumn('nursing') && (
            <DataTableFacetedFilter
              column={table.getColumn('nursing')}
              title="Nursing"
              options={POPULATION_CONFIG.nursing_method}
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
      </div>

      {/* View options outside max width container */}
     <div className='self-end'>
      <div className="flex w-full justify-end">
      <DataTableViewOptions table={table} />
    </div>
    </div>
     
    </div>
  )
}