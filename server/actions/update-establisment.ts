import { initETypedef } from '@/lib/typedef/init-e-typedef'

export async function updateEstablisment(data: initETypedef): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/establishment/update'

  try {
    const requestBody = {
      id: data.id,
      owner: data.owner || 'N/A',
      type_id: data.type_id,
      street: data.street,
      building_no: data.building_no || 'N/A',
      housing_type: data.housing_type,
      water: data.water,
      toilet: data.toilet,
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error posting registration data:', error)
    throw error
  }
}
