import { type NextRequest } from 'next/server'
import { APIResponse } from '@/lib/api-res-helper'
import { APIErrHandler } from '@/lib/api-err-handler'
import { APILogger } from '@/lib/api-req-logger'
import { Query } from '@/lib/db-con-helper'

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request and parameters
    APILogger(request, null)

    // Parse the request body
    const body = await request.json()

    // Extract resident data from request body
    const {
      full_name,
      first_name,
      last_name,
      middle_name,
      gender,
      image_base64,
      fingerprint_base64,
      educationalAttainments,
      isOFW,
      isPersonwithDisability,
      isHouseholdHead,
      childrenCount,
      usageIodized,
      usageFortifiedRice,
      housing_status,
      toilet_type,
      type_of_housing,
      water_source,
      date_of_birth,
      civil_status,
      house_number,
      street_id,
      barangay_id,
      municipality_id,
      province_id,
      postal_code,
      email,
      mobile,
      additional_income,
      is_family_planning,
      family_planning_method,
      is_pregnant,
      is_lactating,
      nursing_method,
      occupation_id,
      nationality_id,
      religion_id,
      benefit_id,
    } = body

    // Validate required fields
    if (
      !additional_income ||
      !is_family_planning ||
      !family_planning_method ||
      !is_pregnant ||
      !is_lactating ||
      !nursing_method ||
      !housing_status ||
      !toilet_type ||
      !type_of_housing ||
      !water_source ||
      !isOFW ||
      !isHouseholdHead ||
      !usageIodized ||
      !usageFortifiedRice ||
      !full_name ||
      !first_name ||
      !last_name ||
      !gender ||
      !educationalAttainments ||
      !isPersonwithDisability ||
      !date_of_birth ||
      !civil_status ||
      !street_id ||
      !barangay_id ||
      !municipality_id ||
      !province_id ||
      !postal_code ||
      !email ||
      !mobile ||
      !occupation_id ||
      !nationality_id ||
      !religion_id ||
      !benefit_id
    ) {
      return APIResponse({ error: 'All required parameters are needed' }, 400)
    }

    // Insert resident ieducational_attainmentnformation
    const residentResult = await Query({
      query:
        'INSERT INTO residents (full_name, first_name, last_name, middle_name, gender, image_base64, fingerprint_base64, date_of_birth, civil_status, educational_attainment_id, occupation_id, nationality_id, religion_id, benefit_id, isOFW, isPersonwithDisability, additional_income) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      values: [
        full_name,
        first_name,
        last_name,
        middle_name,
        gender,
        image_base64,
        fingerprint_base64,
        date_of_birth,
        civil_status,
        educationalAttainments,
        occupation_id,
        nationality_id,
        religion_id,
        benefit_id,
        isOFW,
        isPersonwithDisability,
        additional_income,
      ],
    })

    // Extract resident ID from the inserted
    const residentId = residentResult.insertId

    // Insert address information
    await Query({
      query:
        'INSERT INTO addresses (resident_id, house_number, street_id, barangay_id, municipality_id, province_id, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values: [
        residentId,
        house_number,
        street_id,
        barangay_id,
        municipality_id,
        province_id,
        postal_code,
      ],
    })

    // Insert household_information
    await Query({
      query:
        'INSERT INTO household_information (resident_id, isHouseholdHead, childrenCount, usageIodized, usageFortifiedRice, type_of_housing, housing_status, water_source, toilet_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      values: [
        residentId,
        isHouseholdHead,
        childrenCount,
        usageIodized,
        usageFortifiedRice,
        type_of_housing,
        housing_status,
        water_source,
        toilet_type,
      ],
    })

    // Insert family_health_status
    await Query({
      query:
        'INSERT INTO family_health_status (resident_id, is_family_planning, family_planning_method, is_pregnant, is_lactating, nursing_method) VALUES (?, ?, ?, ?, ?, ?)',
      values: [
        residentId,
        is_family_planning,
        family_planning_method,
        is_pregnant,
        is_lactating,
        nursing_method,
      ],
    })

    // Insert contact information
    await Query({
      query:
        'INSERT INTO contacts (resident_id, email, mobile) VALUES (?, ?, ?)',
      values: [residentId, email, mobile],
    })

    return APIResponse(
      {
        message: 'Resident, address, and contact inserted successfully',
        id: residentId,
      },
      201,
    )
  } catch (error: any) {
    console.error('Database query failed:', error)

    const apiError = APIErrHandler(error)
    if (apiError) {
      return apiError
    }

    return APIResponse({ error: 'Internal server error' }, 500)
  }
}
