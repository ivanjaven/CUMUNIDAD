import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function GET(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    // Execute the database query to fetch user details by ID
    const user = await Query({
      query: `
      SELECT 
    r.resident_id AS resid,
    r.full_name AS name,
    r.gender,
    DATE_FORMAT(r.date_of_birth, '%b %d, %Y') AS birthdate,
    TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) AS age,
    CASE
        WHEN TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) < 1 THEN 'New born'
        WHEN TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) BETWEEN 1 AND 12 THEN 'Child'
        WHEN TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) BETWEEN 13 AND 19 THEN 'Teenager'
        WHEN TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) BETWEEN 20 AND 59 THEN 'Adult'
        WHEN TIMESTAMPDIFF(YEAR, r.date_of_birth, CURDATE()) >= 60 THEN 'Senior Citizen'
        ELSE 'Unknown'
    END AS category,
    s.street_name AS street,
    a.house_number AS house, 
    r.civil_status AS status,
    ea.educational_attainment_name AS education,
    o.occupation_name AS occupation,
    n.nationality_name AS nationality,
    rel.religion_name AS religion,
    b.benefit_name AS benefit,
    r.isPersonwithDisability AS pwd,
    r.isOFW AS ofw,
    r.additional_income AS income,
    hi.isHouseholdHead AS head,
    hi.childrenCount AS children,
    hi.usageIodized AS iodized,
    hi.usageFortifiedRice AS fortified,
    hi.type_of_housing AS housetype,
    hi.housing_status AS occupancy,
    hi.water_source AS water,
    hi.toilet_type AS toilet,
    fhs.is_family_planning AS planning,
    fhs.family_planning_method AS method,
    fhs.is_pregnant AS pregnant,
    fhs.is_lactating AS lactating,
    fhs.nursing_method AS nursing
FROM 
    residents r
LEFT JOIN 
    educational_attainment ea ON r.educational_attainment_id = ea.educational_attainment_id
LEFT JOIN 
    occupations o ON r.occupation_id = o.occupation_id
LEFT JOIN 
    nationalities n ON r.nationality_id = n.nationality_id
LEFT JOIN 
    religions rel ON r.religion_id = rel.religion_id
LEFT JOIN 
    benefits b ON r.benefit_id = b.benefit_id
LEFT JOIN 
    household_information hi ON r.resident_id = hi.resident_id
LEFT JOIN 
    family_health_status fhs ON r.resident_id = fhs.resident_id
LEFT JOIN 
    addresses a ON r.resident_id = a.resident_id
LEFT JOIN 
    streets s ON a.street_id = s.street_id
LEFT JOIN 
    barangays bg ON a.barangay_id = bg.barangay_id
LEFT JOIN 
    municipalities m ON a.municipality_id = m.municipality_id
LEFT JOIN 
    provinces p ON a.province_id = p.province_id
      `,
      values: [],
    })

    console.log('Query Result:', user)

    // Check if the user was found
    if (user.length === 0) {
      return APIResponse({ error: 'User not found' }, 404)
    }

    // Return the formatted response
    return APIResponse(user, 200)
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
