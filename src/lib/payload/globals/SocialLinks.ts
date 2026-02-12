import type { GlobalConfig } from 'payload'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'commercial',
      type: 'group',
      label: 'Commercial Social Links',
      fields: [
        {
          name: 'whatsapp',
          type: 'text',
        },
        {
          name: 'telegram',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
      ],
    },
    {
      name: 'ngo',
      type: 'group',
      label: 'NGO Social Links',
      fields: [
        {
          name: 'whatsapp',
          type: 'text',
        },
        {
          name: 'telegram',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
      ],
    },
  ],
}
