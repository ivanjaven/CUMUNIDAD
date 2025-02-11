'use client'

import React from 'react'
import { CustomSelectField } from '@/components/custom-select-field'
import { CustomInputField } from '@/components/custom-input-field'
import { CustomFormField } from '@/components/custom-form-field'
import { RegistrationTypedef } from '@/lib/typedef/registration-typedef'
import { capitalize } from '@/lib/utils'
import { REGISTRATION_CONFIG } from '@/lib/config/REGISTRATION_CONFIG'
import { MetadataTypedef } from '@/lib/typedef/metadata-typedef'

type PersonalDetailProps = { 
  metadata: MetadataTypedef
  formData: RegistrationTypedef
  onFormDataChange: (id: keyof RegistrationTypedef, value: string) => void
}

export function PersonalDetail({
  metadata,
  formData,
  onFormDataChange,
}: PersonalDetailProps): JSX.Element {
  return (
    <section className="mt-8 space-y-8">
      {/* Name fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
        {['surname', 'name', 'middlename'].map((field) => (
          <CustomFormField key={field} label={capitalize(`${field}${field === 'middlename' ? '' : '*'}`)}>
            <CustomInputField
              id={field as keyof RegistrationTypedef}
              placeholder={`Enter ${field}`}
              type="text"
              cache={formData[field as keyof RegistrationTypedef]}
              handleChange={onFormDataChange}
            />
          </CustomFormField>
        ))}
      </div>

      {/* Birthday, Gender, and Status fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Birthday*">
          <div className="grid grid-cols-3 gap-4">
            <CustomSelectField
              fieldId="day"
              selectPlaceholder="Day"
              selectOptions={REGISTRATION_CONFIG.dropdownOptions.day}
              cache={formData.day}
              handleChange={onFormDataChange}
            />
            <CustomSelectField
              fieldId="month"
              selectPlaceholder="Month"
              selectOptions={REGISTRATION_CONFIG.dropdownOptions.month}
              cache={formData.month}
              handleChange={onFormDataChange}
            />
            <CustomSelectField
              fieldId="year"
              selectPlaceholder="Year"
              selectOptions={REGISTRATION_CONFIG.dropdownOptions.year}
              cache={formData.year}
              handleChange={onFormDataChange}
            />
          </div>
        </CustomFormField>
        <div className="space-y-4">
          <div className="flex gap-4">
            <CustomFormField label="Gender*" className="flex-1">
              <CustomSelectField
                fieldId="gender"
                selectPlaceholder="Select Gender"
                selectOptions={REGISTRATION_CONFIG.dropdownOptions.gender}
                cache={formData.gender}
                handleChange={onFormDataChange}
              />
            </CustomFormField>
            <CustomFormField label="Status*" className="flex-1">
              <CustomSelectField
                fieldId="status"
                selectPlaceholder="Select Status"
                selectOptions={REGISTRATION_CONFIG.dropdownOptions.status}
                cache={formData.status}
                handleChange={onFormDataChange}
              />
            </CustomFormField>
          </div>
        </div>
      </div>

      {/* Address fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <CustomFormField label="Street*">
          <CustomSelectField
            fieldId="street"
            selectPlaceholder="Select Street"
            selectOptions={metadata.street}
            cache={formData.street}
            handleChange={onFormDataChange}
          />
        </CustomFormField>
        <CustomFormField label="House Number">
          <CustomInputField
            id="houseNumber"
            placeholder="Enter house number"
            type="text"
            cache={formData.houseNumber}
            handleChange={onFormDataChange}
          />
        </CustomFormField>
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {['email', 'mobile'].map((field) => (
          <CustomFormField key={field} label={capitalize(field)}>
            <CustomInputField
              id={field as keyof RegistrationTypedef}
              placeholder={`Enter ${field}`}
              type={field === 'email' ? 'email' : 'number'}
              cache={formData[field as keyof RegistrationTypedef]}
              handleChange={onFormDataChange}
            />
          </CustomFormField>
        ))}
      </div>

    
      {/* Address fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:gap-8">

      <CustomFormField label="Educational Attainment*">
          <CustomSelectField
            fieldId="educationalAttainments"
            selectPlaceholder="Select Educational Attainments"
            selectOptions={metadata.educationalAttainments}
            cache={formData.educationalAttainments}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Occupation*">
          <CustomSelectField
            fieldId={'occupation' as keyof RegistrationTypedef}
            selectPlaceholder="Select occupation"
            selectOptions={metadata.occupation}
            cache={formData.occupation}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Nationality*">
          <CustomSelectField
            fieldId={'nationality' as keyof RegistrationTypedef}
            selectPlaceholder="Select nationality"
            selectOptions={metadata.nationality}
            cache={formData.nationality}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Religion*">
          <CustomSelectField
            fieldId={'religion' as keyof RegistrationTypedef}
            selectPlaceholder="Select religion"
            selectOptions={metadata.religion}
            cache={formData.religion}
            handleChange={onFormDataChange}
          />
        </CustomFormField>        
      </div>

      


       {/* Address fields */}
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 sm:gap-8">
       
        <CustomFormField label="OFW*">
          <CustomSelectField
            fieldId={'isOFW' as keyof RegistrationTypedef}
            selectPlaceholder="Are you a OFW?"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.answer}
            cache={formData.isOFW}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Person with Disability*">
          <CustomSelectField
            fieldId="isPersonwithDisability"
            selectPlaceholder="Are you a person with disability?"
            selectOptions={REGISTRATION_CONFIG.dropdownOptions.answer}
            cache={formData.isPersonwithDisability}
            handleChange={onFormDataChange}
          />
        </CustomFormField>

        <CustomFormField label="Benefit with ID*">
          <CustomSelectField
            fieldId={'benefits' as keyof RegistrationTypedef}
            selectPlaceholder="Select benefit"
            selectOptions={metadata.benefits}
            cache={formData.benefits}
            handleChange={onFormDataChange}
          />
        </CustomFormField>
      </div>
    </section>
  )
} 
