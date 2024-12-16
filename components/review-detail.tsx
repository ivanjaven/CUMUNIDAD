import React from 'react'
import {
  User, Calendar, Home, Phone, Mail, Briefcase, Flag,
  Heart, Star, GraduationCap, Users, Activity, Baby,
  Home as HouseIcon, Droplet, DollarSign, Stethoscope,
  Baby as BabyIcon
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type InfoItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | boolean;
  category?: string;
}

const InfoItemComponent: React.FC<{ item: InfoItem }> = ({ item }) => (
  <div className="flex items-start space-x-4 py-4 border-b border-slate-100 last:border-b-0">
    <div className="flex-shrink-0 pt-1">
      <item.icon className="h-5 w-5 text-slate-400" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-base text-slate-600">{item.label}</p>
      {typeof item.value === 'boolean' ? (
        <Badge 
          variant={item.value ? 'default' : 'secondary'} 
          className={`mt-1.5 text-sm ${item.value ? 'bg-slate-900' : 'bg-slate-200'}`}
        >
          {item.value ? 'Yes' : 'No'}
        </Badge>
      ) : (
        <p className="text-base font-medium text-slate-900 mt-1.5 truncate">{item.value || 'N/A'}</p>
      )}
    </div>
  </div>
)

const CategorySection: React.FC<{ 
  title: string;
  items: InfoItem[];
}> = ({ title, items }) => (
  <div className="border-t border-slate-200 pt-8">
    <h3 className="text-base font-semibold text-slate-900 mb-6">{title}</h3>
    <div className="grid gap-0 sm:grid-cols-2">
      {items.map((item, index) => (
        <InfoItemComponent key={index} item={item} />
      ))}
    </div>
  </div>
)

const formatDate = (day: string, month: string, year: string) => {
  const date = new Date(`${year}-${month}-${day}`)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ReviewDetail({ formData, metadata }: {
  formData: any;
  metadata: any;
}) {
  const getValueFromMetadata = (key: string, id: number) => {
    const item = metadata[key]?.find((item: any) => item.id === id)
    return item ? item.type || item.name : ''
  }

  const fullName = `${formData.surname || ''} ${formData.name || ''} ${formData.middlename || ''}`.trim()

  const personalInfo: InfoItem[] = [
    { icon: User, label: 'Full Name', value: fullName },
    { icon: Calendar, label: 'Date of Birth', value: formatDate(formData.day, formData.month, formData.year) },
    { icon: User, label: 'Gender', value: formData.gender },
    { icon: Heart, label: 'Marital Status', value: formData.status },
    { icon: Home, label: 'Address', value: `${getValueFromMetadata('street', parseInt(formData.street))} ${formData.houseNumber}` },
  ]

  const contactInfo: InfoItem[] = [
    { icon: Phone, label: 'Mobile', value: formData.mobile || 'N/A' },
    { icon: Mail, label: 'Email', value: formData.email || 'N/A' },
  ]

  const statusInfo: InfoItem[] = [
    { icon: GraduationCap, label: 'Educational Attainment', value: getValueFromMetadata('educationalAttainments', parseInt(formData.educationalAttainments)) },
    { icon: Activity, label: 'Person with Disability', value: formData.isPersonwithDisability },
    { icon: Users, label: 'Children Count', value: formData.childrenCount },
    { icon: User, label: 'Household Head', value: formData.isHouseholdHead },
  ]

  const householdInfo: InfoItem[] = [
    { icon: Home, label: 'Toilet Type', value: formData.toilet_type },
    { icon: HouseIcon, label: 'Type of Housing', value: formData.type_of_housing },
    { icon: Droplet, label: 'Water Source', value: formData.water_source },
  ]

  const healthInfo: InfoItem[] = [
    { icon: Stethoscope, label: 'Family Planning', value: formData.is_family_planning },
    { icon: Stethoscope, label: 'Family Planning Method', value: formData.family_planning_method },
    { icon: BabyIcon, label: 'Lactating', value: formData.is_lactating },
    { icon: Baby, label: 'Pregnant', value: formData.is_pregnant },
    { icon: Baby, label: 'Nursing Method', value: formData.nursing_method },
  ]

  const economicInfo: InfoItem[] = [
    { icon: Briefcase, label: 'Occupation', value: getValueFromMetadata('occupation', parseInt(formData.occupation)) },
    { icon: Flag, label: 'Nationality', value: getValueFromMetadata('nationality', parseInt(formData.nationality)) },
    { icon: Star, label: 'Benefits', value: getValueFromMetadata('benefits', parseInt(formData.benefits)) },
    { icon: Flag, label: 'OFW Status', value: formData.isOFW },
    { icon: DollarSign, label: 'Additional Income', value: formData.additional_income },
  ]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-16">
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-slate-900">Registration Details</h2>
          <p className="mt-2 text-base text-slate-600">{fullName}</p>
        </div>
        
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-16">
            <CategorySection title="Personal Information" items={personalInfo} />
            <CategorySection title="Contact Information" items={contactInfo} />
            <CategorySection title="Status Information" items={statusInfo} />
          </div>
          <div className="space-y-16">
            <CategorySection title="Household Information" items={householdInfo} />
            <CategorySection title="Health Information" items={healthInfo} />
            <CategorySection title="Economic Information" items={economicInfo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewDetail