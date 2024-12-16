import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function PUT(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    // Parse the request body
    const body = await request.json()

    // Extract establishment data from request body
    const {
      id,
      owner,
      type_id,
      street,
      building_no,
      housing_type,
      water,
      toilet,
    } = body

    // Validate required fields
    if (
      !id ||
      !owner ||
      !type_id ||
      !street ||
      !building_no ||
      !housing_type ||
      !water ||
      !toilet
    ) {
      return APIResponse({ error: 'All required parameters are needed' }, 400)
    }

    try {
      // Update establishment information
      await Query({
        query: `
          UPDATE establishment 
          SET owner_name = ?, 
              establishment_type_id = ?, 
              street_id = ?, 
              building_number = ?, 
              type_of_housing = ?, 
              water_source = ?, 
              toilet_type = ?
          WHERE establishment_id = ?
        `,
        values: [
          owner,
          type_id,
          street,
          building_no,
          housing_type,
          water,
          toilet,
          id,
        ],
      })

      return APIResponse(
        {
          message: 'Establishment information updated successfully'
        },
        200
      )
    } catch (error) {
      throw error // Re-throw to be caught by outer catch block
    }
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}