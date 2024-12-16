interface PopulationTypedef {
  id: number
  owner: string
  establishment: string
  bld_no: string
  street: string
  type: string
  water: string
  toilet: string
}

export async function fetchEstablishmentList(): Promise<PopulationTypedef[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/establishment/get'

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: PopulationTypedef[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching population records:', error)
    throw error
  }
}
