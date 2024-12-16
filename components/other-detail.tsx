'use client'

import React from 'react'
import { CustomSelectField } from '@/components/custom-select-field'
import { CustomFormField } from '@/components/custom-form-field'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'
import { capitalize } from '@/lib/utils'
import { REGISTRATION_CONFIG } from '@/lib/config/REGISTRATION_CONFIG'
import { MetadataTypedef } from '@/lib/typedef/metadata-typedef'

type OtherProps = { 
  metadata: MetadataTypedef
  formData: RegistrationTypedef
  onFormDataChange: (id: keyof RegistrationTypedef, value: string) => void
}

export function OtherDetails({
  metadata,
  formData,
  onFormDataChange,
}: OtherProps): JSX.Element {
  return (
    <section className="mt-8 space-y-8">
       {/* Address fields */}
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Family Planning">
          <CustomSelectField
            fieldId="is_family_planning"
            selectPlaceholder="Do you practice Family Planning?"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.answer}
            cache={formData.is_family_planning}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Family Planning Method">
          <CustomSelectField
            fieldId="family_planning_method"
            selectPlaceholder="Family Planning Method"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.family_planning_method}
            cache={formData.family_planning_method}
            handleChange={onFormDataChange}
          />
        </CustomFormField>
      </div>


      {/* Address fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Pregnant">
          <CustomSelectField
            fieldId="is_pregnant"
            selectPlaceholder="Are you pregnant?"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.answer}
            cache={formData.is_pregnant}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Lactating">
          <CustomSelectField
            fieldId="is_lactating"
            selectPlaceholder="Are you Lactating?"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.answer}
            cache={formData.is_lactating}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Nursing Method">
          <CustomSelectField
            fieldId="nursing_method"
            selectPlaceholder="Nursing Method"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.nursing_method}
            cache={formData.nursing_method}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Additional Income">
          <CustomSelectField
            fieldId="additional_income"
            selectPlaceholder="Additional source of income?"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.additional_income}
            cache={formData.additional_income}
            handleChange={onFormDataChange}
          />
        </CustomFormField>
      </div>
    </section>
  )
} 
