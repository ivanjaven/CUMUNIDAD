interface PopulationTypedef {
 
resid: number
name: string
gender: string
birthdate: string
age: number
category: string
street: string
house: string
status: string
education: string 
occupation: string
nationality: string
religion: string
benefit: string
pwd: string
ofw: string
income: string
head: string 
children: number
iodized: string
fortified: string
housetype: string
occupancy: string
water: string
toilet: string
planning: string
method: string
pregnant: string
lactating: string
nursing: string
}
  
  export async function fetchPopulationList(): Promise<PopulationTypedef[]> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    const endpoint = '/api/population/records'
  
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
  





