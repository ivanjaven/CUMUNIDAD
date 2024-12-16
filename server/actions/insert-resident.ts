import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'

export async function insertResident(data: RegistrationTypedef): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const endpoint = '/api/resident/register'

  try {
    const requestBody = {
      full_name: `${data.name} ${data.middlename} ${data.surname}`,
      first_name: data.name,
      last_name: data.surname, 
      middle_name: data.middlename || 'N/A',
      gender: data.gender,
      image_base64: data.image_base64,
      fingerprint_base64: data.fingerprint_fmd,
      date_of_birth: `${data.year}-${data.month}-${data.day}`,
      civil_status: data.status,
      house_number: data.houseNumber || 'N/A',
      street_id: data.street,
      barangay_id: '1',
      municipality_id: '1', 
      educationalAttainments: data.educationalAttainments,
      isOFW: data.isOFW,
      housing_status: data.housing_status || 'N/A',
      toilet_type: data.toilet_type || 'N/A',
      type_of_housing: data.type_of_housing || 'N/A',
      water_source: data.water_source || 'N/A',
      isHouseholdHead: data.isHouseholdHead,
      isPersonwithDisability: data.isPersonwithDisability, 
      childrenCount: data.childrenCount || 0,
      usageIodized: data.usageIodized || 'N/A',
      usageFortifiedRice: data.usageFortifiedRice || 'N/A',
      additional_income: data.additional_income || 'N/A',
      is_family_planning: data.is_family_planning || 'N/A',
      family_planning_method: data.family_planning_method || 'N/A',
      is_pregnant: data.is_pregnant || 'N/A',
      is_lactating: data.is_lactating || 'N/A',
      nursing_method: data.nursing_method || 'N/A',
      province_id: '1',
      postal_code: '3017',
      email: data.email || 'N/A',
      mobile: data.mobile || 'N/A',
      occupation_id: data.occupation,
      nationality_id: data.nationality,
      religion_id: data.religion,
      benefit_id: data.benefits,
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
