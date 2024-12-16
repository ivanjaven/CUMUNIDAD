// app/server/actions/change-admin.ts
export async function changeAdmin(
  newAdminId: number,
  oldAdminId: number,
): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/auth/change-admin'

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newAdminId,
        oldAdminId,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error changing admin:', error)
    throw error
  }
}
