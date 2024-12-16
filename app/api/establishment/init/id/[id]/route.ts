import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Log the incoming request and parameters
    APILogger(request, params)

    const { id } = params

    // Validate that the ID parameter is provided and is numeric
    if (!id || isNaN(Number(id))) {
      return APIResponse({ error: 'Valid ID parameter is required' }, 400)
    }

    // Fetch data from the database using the updated query
    const user = await Query({
      query: `
        SELECT 
        establishment_id AS id,
    owner_name AS owner,
    establishment_type_id AS type_id,
    street_id AS street,
    building_number AS building_no,
    type_of_housing AS housing_type,
    water_source AS water,
    toilet_type AS toilet
FROM 
    establishment
    WHERE establishment_id =  ?
      `,
      values: [id],
    })

    // Check if the user was found
    if (!user || user.length === 0) {
      return APIResponse({ error: 'Resident not found' }, 404)
    }

    // Return the formatted response
    return APIResponse(user, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
