import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    // Parse the request body
    const body = await request.json()

    // Extract resident data from request body
    const {
      ownerName,
      establishment,
      street,
      buildingNumber,
      buildingType,
      waterSource,
      toiletType,
    } = body

    // Validate required fields
    if (
      !ownerName ||
      !establishment ||
      !street ||
      !buildingNumber ||
      !buildingType ||
      !waterSource ||
      !toiletType
    ) {
      return APIResponse({ error: 'All required parameters are needed' }, 400)
    }

    // Insert resident ieducational_attainmentnformation
    await Query({
      query:
        'INSERT INTO establishment (owner_name, establishment_type_id, street_id, building_number, type_of_housing, water_source, toilet_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values: [
        ownerName,
        establishment,
        street,
        buildingNumber,
        buildingType, 
        waterSource,
        toiletType,
      ],
    })

   

    return APIResponse(
      {
        message: 'Resident, address, and contact inserted successfully',
      },
      201,
    )
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
