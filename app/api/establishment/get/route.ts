import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function GET(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    // Execute the database query to fetch user details by ID
    const user = await Query({
      query: `
        SELECT 
          e.establishment_id AS id,
            e.owner_name AS 'owner',
            et.establishment_type_name AS 'establishment',
            e.building_number AS 'bld_no',
            s.street_name AS 'street',
            e.type_of_housing AS 'type',
            e.water_source AS 'water',
            e.toilet_type AS 'toilet'
        FROM establishment e
        JOIN establishment_type et ON e.establishment_type_id = et.establishment_type_id
        JOIN streets s ON e.street_id = s.street_id
        JOIN barangays b ON s.barangay_id = b.barangay_id
        JOIN municipalities m ON b.municipality_id = m.municipality_id
        JOIN provinces p ON m.province_id = p.province_id
      `,
      values: [],
    })

    console.log('Query Result:', user)

    // Check if the user was found
    if (user.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
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
