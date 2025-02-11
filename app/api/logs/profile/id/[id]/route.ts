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

    // Extract query parameters for pagination and resident_id
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1', 10) // Current page number
    const limit = parseInt(searchParams.get('limit') || '25', 10) // Number of logs per page
    const offset = (page - 1) * limit // Calculate offset for pagination

    // Validate that the ID parameter is provided
    if (!id) {
      return APIResponse({ error: 'ID parameter is required' }, 400)
    }

    // Fetch data from the database using the simplified query
    const logs = await Query({
      query: `
        SELECT
          CASE document_title
            WHEN 'Barangay Business Clearance' THEN 'Bus. Clearance'
            WHEN 'Barangay Clearance' THEN 'Brgy. Clearance'
            WHEN 'Certificate of Indigency' THEN 'Indigency Cert.'
            WHEN 'Certificate of Residency' THEN 'Residency Cert.'
            ELSE LEFT(document_title, 15)
          END AS label,
          CONCAT(document_title, ' issued to ', r.full_name, ' by ', d.issued_by, ' - A fee of ₱', FORMAT(d.price, 2), ' was charged.') AS description,
          DATE_FORMAT(d.created_at, '%a - %b %d, %Y - %h:%i %p') AS date
        FROM documents d
        JOIN residents r ON d.resident_id = r.resident_id
        WHERE d.resident_id = ?
        ORDER BY d.created_at DESC
        LIMIT ? OFFSET ?
      `,
      values: [id, limit, offset],
    })

    // Check if no data was found
    if (logs.length === 0 && page === 1) {
      return APIResponse({ message: 'No activity logs found', data: [] }, 200)
    }

    // Return the formatted response
    return APIResponse({ data: logs }, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
