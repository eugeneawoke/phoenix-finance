import type { GlobalConfig } from 'payload'

export const CompanyDetails: GlobalConfig = {
  slug: 'company-details',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      localized: true,
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'taxId',
      type: 'text',
      label: 'Tax ID',
    },
    {
      name: 'bankName',
      type: 'text',
    },
    {
      name: 'bankDetails',
      type: 'textarea',
      localized: true,
    },
  ],
}
