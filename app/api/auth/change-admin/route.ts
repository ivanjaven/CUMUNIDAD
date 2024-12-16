// app/api/auth/change-admin/route.ts
import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  try {
    APILogger(request, null)

    const body = await request.json()
    const { newAdminId, oldAdminId } = body

    if (!newAdminId || !oldAdminId) {
      return APIResponse({ error: 'All parameters are required' }, 400)
    }

    // Delete old admin
    await Query({
      query: 'DELETE FROM auth WHERE resident_id = ?',
      values: [oldAdminId],
    })

    // Insert new admin
    await Query({
      query:
        'INSERT INTO auth (role, resident_id, username, password) VALUES (?, ?, ?, ?)',
      values: [
        'admin',
        newAdminId,
        `admin${newAdminId}`,
        '$2b$10$j1BFG4hR07qGvKs6cc4jE.kJl5Ko3eRhBl3pbMCwIH8DJiRSFYYgW',
      ],
    })

    return APIResponse({ message: 'Admin changed successfully' }, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
