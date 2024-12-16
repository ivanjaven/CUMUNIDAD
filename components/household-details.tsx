'use client'

import React from 'react'
import { CustomSelectField } from '@/components/custom-select-field'
import { CustomInputField } from '@/components/custom-input-field'
import { CustomFormField } from '@/components/custom-form-field'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'
import { capitalize } from '@/lib/utils'
import { REGISTRATION_CONFIG } from '@/lib/config/REGISTRATION_CONFIG'
import { MetadataTypedef } from '@/lib/typedef/metadata-typedef'

type HouseHoldDetailsProps = { 
  metadata: MetadataTypedef
  formData: RegistrationTypedef
  onFormDataChange: (id: keyof RegistrationTypedef, value: string) => void
}

export function HouseHoldDetails({
  metadata,
  formData,
  onFormDataChange,
}: HouseHoldDetailsProps): JSX.Element {
  return (
    <section className="mt-8 space-y-8">

      {/* Address fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Head of Household*">
          <CustomSelectField
            fieldId="isHouseholdHead"
            selectPlaceholder="Are you the head of the family?"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.answer}
            cache={formData.isHouseholdHead}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Children Count">
          <CustomInputField
            id="childrenCount"
            placeholder="Enter Number of children"
            type="number"
            cache={formData.childrenCount}
            handleChange={onFormDataChange}
          />
        </CustomFormField> 
      </div>

       {/* Address fields */}
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Iodized Salt Usage">
          <CustomSelectField
            fieldId="usageIodized"
            selectPlaceholder="Does your household use iodized salt?"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.answer}
            cache={formData.usageIodized}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Iron-Fortified Rice Usage">
          <CustomSelectField
            fieldId="usageFortifiedRice"
            selectPlaceholder="Does you house use iron fortification rice?"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.answer}
            cache={formData.usageFortifiedRice}
            handleChange={onFormDataChange}
          />
        </CustomFormField>
      </div>


      {/* Address fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Type of housing">
          <CustomSelectField
            fieldId="type_of_housing"
            selectPlaceholder="Type of housing?"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.type_of_housing}
            cache={formData.type_of_housing}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Occupancy">
          <CustomSelectField
            fieldId="housing_status"
            selectPlaceholder="Select	Occupancy"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.housing_status}
            cache={formData.housing_status}
            handleChange={onFormDataChange}
          />
        </CustomFormField>
      </div>

      {/* Address fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Water source">
          <CustomSelectField
            fieldId="water_source"
            selectPlaceholder="Water source "
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.water_source}
            cache={formData.water_source}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Toilet Type">
          <CustomSelectField
            fieldId="toilet_type"
            selectPlaceholder="Toilet Type"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.toilet_type}
            cache={formData.toilet_type}
            handleChange={onFormDataChange}
          />
        </CustomFormField>
      </div>
    </section>
  )
} 
