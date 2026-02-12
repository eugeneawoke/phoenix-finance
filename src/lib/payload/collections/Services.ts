import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrManager } from '../access'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAdminOrManager,
    update: isAdminOrManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      maxLength: 300,
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name (e.g. "calculator", "file-text")',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Accounting', value: 'accounting' },
        { label: 'Tax', value: 'tax' },
        { label: 'Audit', value: 'audit' },
        { label: 'Consulting', value: 'consulting' },
        { label: 'Registration', value: 'registration' },
        { label: 'Payroll', value: 'payroll' },
        { label: 'Reporting', value: 'reporting' },
        { label: 'International', value: 'international' },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Fixed', value: 'fixed' },
            { label: 'Hourly', value: 'hourly' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        {
          name: 'amount',
          type: 'number',
        },
        {
          name: 'currency',
          type: 'select',
          options: [
            { label: 'GEL', value: 'GEL' },
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
          ],
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
