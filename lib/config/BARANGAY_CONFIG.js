export const BarangayConfig = {
  // Default settings for the barangay
  defaultSettings: {
    logoUrl: '/assets/images/bambanglogo.png',
    name: 'Bambang',
  },

  // User roles and their associated quick access features
  userRoles: {
    // Configuration for the 'admin' role
    admin: {
      quickAccessFeatures: [
        {
          title: 'Resident Registration',
          description:
            'Guidelines and procedures for registering residents in the barangay.',
          imageUrl: '/assets/images/registration.png',
          linkUrl: '/resident/registration',
        },
        {
          title: 'Document Processing',
          description:
            'Instructions on obtaining and processing various barangay documents.',
          imageUrl: '/assets/images/records.png',
          linkUrl: '/documents',
        },
        {
          title: 'Report Generation',
          description:
            'Overview of barangay reports and how to generate them steps to create and manage.',
          imageUrl: '/assets/images/report.png',
          linkUrl: '/reports',
        },
        {
          title: 'Population Records',
          description:
            'Maintaining and updating the population records of the barangay.',
          imageUrl: '/assets/images/folders.png',
          linkUrl: 'population-records',
        },
        {
          title: 'Establishment Records',
          description:
            'Maintaining and updating the population records of the barangay.',
          imageUrl: '/assets/images/establishment.png',
          linkUrl: '/establishment',
        },
        {
          title: 'Barangay Information',
          description:
            'Comprehensive details about the barangay, including history and demographics.',
          imageUrl: '/assets/images/city.png',
          linkUrl: '/barangay-information',
        },
        {
          title: 'User Management',
          description:
            'Steps to create and manage user profiles in the barangay system.',
          imageUrl: '/assets/images/adduser.png',
          linkUrl: '/user-management',
        },
      ],
    },

    // Configuration for the 'secretary' role
    secretary: {
      quickAccessFeatures: [
        {
          title: 'Resident Registration',
          description:
            'Guidelines and procedures for registering residents in the barangay.',
          imageUrl: '/assets/images/registration.png',
          linkUrl: '/resident/registration',
        },
        {
          title: 'Document Processing',
          description:
            'Instructions on obtaining and processing various barangay documents.',
          imageUrl: '/assets/images/records.png',
          linkUrl: '/documents',
        },
        {
          title: 'Report Generation',
          description: 'Overview of barangay reports and how to generate them.',
          imageUrl: '/assets/images/report.png',
          linkUrl: '/reports',
        },
        {
          title: 'Population Records',
          description:
            'Maintaining and updating the population records of the barangay.',
          imageUrl: '/assets/images/folders.png',
          linkUrl: 'population-records',
        },
        {
          title: 'Barangay Information',
          description:
            'Comprehensive details about the barangay, including history and demographics.',
          imageUrl: '/assets/images/city.png',
          linkUrl: '/barangay-information',
        },
      ],
    },
    clerk: {
      quickAccessFeatures: [
        {
          title: 'Resident Registration',
          description:
            'Guidelines and procedures for registering residents in the barangay.',
          imageUrl: '/assets/images/registration.png',
          linkUrl: '/resident/registration',
        },
        {
          title: 'Document Processing',
          description:
            'Instructions on obtaining and processing various barangay documents.',
          imageUrl: '/assets/images/records.png',
          linkUrl: '/documents',
        },
        {
          title: 'Report Generation',
          description: 'Overview of barangay reports and how to generate them.',
          imageUrl: '/assets/images/report.png',
          linkUrl: '/reports',
        },
        {
          title: 'Population Records',
          description:
            'Maintaining and updating the population records of the barangay.',
          imageUrl: '/assets/images/folders.png',
          linkUrl: 'population-records',
        },
        {
          title: 'Barangay Information',
          description:
            'Comprehensive details about the barangay, including history and demographics.',
          imageUrl: '/assets/images/city.png',
          linkUrl: '/barangay-information',
        },
      ],
    },
    bpw: {
      quickAccessFeatures: [
        {
          title: 'Resident Registration',
          description:
            'Guidelines and procedures for registering residents in the barangay.',
          imageUrl: '/assets/images/registration.png',
          linkUrl: '/resident/registration',
        },
        {
          title: 'Document Processing',
          description:
            'Instructions on obtaining and processing various barangay documents.',
          imageUrl: '/assets/images/records.png',
          linkUrl: '/documents',
        },
        {
          title: 'Report Generation',
          description: 'Overview of barangay reports and how to generate them.',
          imageUrl: '/assets/images/report.png',
          linkUrl: '/reports',
        },
        {
          title: 'Population Records',
          description:
            'Maintaining and updating the population records of the barangay.',
          imageUrl: '/assets/images/folders.png',
          linkUrl: 'population-records',
        },
        {
          title: 'Barangay Information',
          description:
            'Comprehensive details about the barangay, including history and demographics.',
          imageUrl: '/assets/images/city.png',
          linkUrl: '/barangay-information',
        },
      ],
    },
    motherleader: {
      quickAccessFeatures: [
        {
          title: 'Resident Registration',
          description:
            'Guidelines and procedures for registering residents in the barangay.',
          imageUrl: '/assets/images/registration.png',
          linkUrl: '/resident/registration',
        },
        {
          title: 'Report Generation',
          description: 'Overview of barangay reports and how to generate them.',
          imageUrl: '/assets/images/report.png',
          linkUrl: '/reports',
        },
        {
          title: 'Population Records',
          description:
            'Maintaining and updating the population records of the barangay.',
          imageUrl: '/assets/images/folders.png',
          linkUrl: 'population-records',
        },
        {
          title: 'Barangay Information',
          description:
            'Comprehensive details about the barangay, including history and demographics.',
          imageUrl: '/assets/images/city.png',
          linkUrl: '/barangay-information',
        },
      ],
    },
  },
}
