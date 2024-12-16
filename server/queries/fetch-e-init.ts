import { initETypedef } from '@/lib/typedef/init-e-typedef'

export async function fetchEInit(query: number): Promise<initETypedef[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = `/api/establishment/init/id/${query}`

  try {
    const response = await fetch(`${baseUrl}${endpoint}`)

    console.log(`fetching url: ${baseUrl}${endpoint}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: initETypedef[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching resident information:', error)
    throw error
  }
}
