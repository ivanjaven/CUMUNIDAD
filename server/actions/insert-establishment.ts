export interface EstablishmentFormValues {
    ownerName: string;
    establishment: string;
    street: string;
    buildingNumber: string;
    buildingType: string;
    waterSource: string;
    toiletType: string;
  }

export async function insertEstablishment(data: EstablishmentFormValues): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/establishment/insert'

  try {
    const requestBody = {
        ownerName: data.ownerName || 'N/A',
        establishment: data.establishment,
        street: data.street,
        buildingNumber: data.buildingNumber || 'N/A',
        buildingType: data.buildingType || 'N/A',
        waterSource: data.waterSource || 'N/A',
        toiletType: data.toiletType || 'N/A',
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
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
