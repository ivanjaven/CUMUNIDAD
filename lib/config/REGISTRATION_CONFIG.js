// Constants for the current year and the start year
const CURRENT_YEAR = new Date().getFullYear()
const START_YEAR = 1900

// Exporting the registration configuration object
export const REGISTRATION_CONFIG = {
  // Registration steps
  steps: [
    {
      id: 1,
      name: 'Personal Details',
      title: 'Provide Your Residential Details',
      subtitle: 'Let`s start with your personal details',
    },
    {
      id: 2,
      name: 'Household Details',
      title: 'Provide Your Household Details',
      subtitle: 'Complete Your Household Details',
    },

    {
      id: 3,
      name: 'Other Details',
      title: 'Provide Your Other Details',
      subtitle: 'Complete Your Other Details ',
    },
    {
      id: 4,
      name: 'Verification Details',
      title: 'Provide Your Verification Details',
      subtitle: 'Lets capture your photo and fingerprint',
    },
    {
      id: 5,
      name: 'Review & Submit',
      title: 'Almost There!',
      subtitle: 'Review your information before submitting',
    },
  ],

  // Required fields for each step
  requiredFields: {
    1: [
      'surname',
      'name',
      'day',
      'month',
      'year',
      'gender',
      'status',
      'street',
      'educationalAttainments',
      'occupation',
      'nationality',
      'religion',
      'isOFW',
      'isPersonwithDisability',
      'benefits',
    ],
    2: ['isHouseholdHead'],
    3: [],
    4: [],
    5: [],
  },

  // Success messages
  successMessages: {
    title: 'Congratulations 🎉',
    subtitle: 'You have completed your registration',
  },

  // Error messages for validation
  errorMessages: {
    surname:
      'Please enter your surname (family name). This is a required field.',
    name: 'Please enter your given name. This is a required field.',
    day: 'Please select your complete date of birth. All parts (day, month, and year) are required.',
    month:
      'Please select your complete date of birth. All parts (day, month, and year) are required.',
    year: 'Please select your complete date of birth. All parts (day, month, and year) are required.',
    gender:
      'Please select your gender from the provided options. This information is required.',
    status:
      'Please indicate your marital status. This information is necessary for our records.',
    street:
      'Please select your street from the dropdown list. This is part of your required address information.',
    educationalAttainments:
      'Please indicate your highest educational attainment. This information is required.',
    occupation:
      'Please select your current occupation from the list. This information is required for our records.',
    nationality:
      'Please select your nationality. This is a required piece of information for our database.',
    religion:
      'Please select your religion or belief system. While personal, this information is required for our records.',
    isOFW:
      'Please indicate if you are an Overseas Filipino Worker (OFW). This information is required.',
    isPersonwithDisability:
      'Please indicate if you are a person with a disability. This information is required.',
    benefits:
      'Please select any applicable benefits. If none apply, please choose "None" from the list. This field is required.',
    isHouseholdHead:
      'Please indicate if you are the household head. This information is required.',
  },

  // Dropdown options for various fields
  dropdownOptions: {
    day: Array.from({ length: 31 }, (_, i) => ({
      id: (i + 1).toString().padStart(2, '0'),
      type: (i + 1).toString(),
    })),
    month: [
      { id: '01', type: 'Jan' },
      { id: '02', type: 'Feb' },
      { id: '03', type: 'Mar' },
      { id: '04', type: 'Apr' },
      { id: '05', type: 'May' },
      { id: '06', type: 'Jun' },
      { id: '07', type: 'Jul' },
      { id: '08', type: 'Aug' },
      { id: '09', type: 'Sep' },
      { id: '10', type: 'Oct' },
      { id: '11', type: 'Nov' },
      { id: '12', type: 'Dec' },
    ],
    year: Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => {
      const year = (START_YEAR + i).toString()
      return { id: year, type: year }
    }).reverse(),
    gender: [
      { id: 'Male', type: 'Male' },
      { id: 'Female', type: 'Female' },
      { id: 'Other', type: 'Other' },
    ],
    status: [
      { id: 'Single', type: 'Single' },
      { id: 'Married', type: 'Married' },
      { id: 'Divorced', type: 'Divorced' },
      { id: 'Widowed', type: 'Widowed' },
      { id: 'Live In', type: 'Live In' },
      { id: 'Separated', type: 'Separated' },
      { id: 'Solo Parent', type: 'Solo Parent' },
    ],

    answer: [
      { id: 'N/A', type: 'N/A' },
      { id: 'Yes', type: 'Yes' },
      { id: 'No', type: 'No' },
    ],
    type_of_housing: [
      { id: 'N/A', type: 'N/A' },
      { id: 'Concrete', type: 'Concrete' },
      { id: 'Semi-Concrete', type: 'Semi-Concrete' },
      { id: 'Kahoy', type: 'Kahoy' },
      { id: 'Salvaged', type: 'Salvaged' },
    ],
    housing_status: [
      { id: 'N/A', type: 'N/A' },
      { id: 'Sariling Bahay', type: 'Sariling Bahay' },
      { id: 'Nangungupahan', type: 'Nangungupahan' },
      { id: 'Nakikitira', type: 'Nakikitira' },
    ],
    water_source: [
      { id: 'N/A', type: 'N/A' },
      { id: 'Pipe', type: 'Pipe' },
      { id: 'Well', type: 'Well' },
      { id: 'Spring', type: 'Spring' },
    ],
    toilet_type: [
      { id: 'N/A', type: 'N/A' },
      { id: 'Water Sealed', type: 'Water Sealed' },
      { id: 'Open Pit', type: 'Open Pit' },
      { id: 'Other', type: 'Other' },
    ],
    additional_income: [
      { id: 'N/A', type: 'N/A' },
      { id: 'Buy and Sell', type: 'Buy and Sell' },
    ],
    family_planning_method: [
      { id: 'N/A', type: 'N/A' },
      { id: 'Condom', type: 'Condom' },
    ],
    nursing_method: [
      { id: 'N/A', type: 'N/A' },
      { id: 'Bottled Milk', type: 'Bottled Milk' },
    ],
  },

  // Verification Details configuration
  verificationDetails: {
    facialPhoto: {
      title: 'Facial Photo',
      subtitle: 'Take a clear photo of your face',
      instructions: [
        'Ensure good lighting',
        'Face the camera directly',
        'Remove glasses or hats',
      ],
    },
    fingerprint: {
      title: 'Fingerprint',
      subtitle: 'Capture your fingerprint',
      instructions: [
        'Clean your fingertip',
        'Place finger flat on the sensor',
        'Hold still until capture is complete',
      ],
    },
  },
}
