import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrSelf, isAdminFieldLevel } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      localized: true,
    },
    {
      name: 'lastName',
      type: 'text',
      localized: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Client', value: 'client' },
        { label: 'Partner', value: 'partner' },
        { label: 'Manager', value: 'manager' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'client',
      required: true,
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'preferredLanguage',
      type: 'select',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Georgian', value: 'ge' },
        { label: 'Russian', value: 'ru' },
      ],
    },
    {
      name: 'salesforceId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'section',
      type: 'select',
      options: [
        { label: 'Commercial', value: 'commercial' },
        { label: 'NGO', value: 'ngo' },
        { label: 'Both', value: 'both' },
      ],
    },
  ],
}
