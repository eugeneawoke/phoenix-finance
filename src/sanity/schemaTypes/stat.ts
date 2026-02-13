import { defineType, defineField } from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Statistics',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Russian', value: 'ru' },
          { title: 'Georgian', value: 'ge' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Key (e.g. clients, years, satisfaction)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value (e.g. 50+, 7, 95%)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      value: 'value',
      label: 'label',
      language: 'language',
    },
    prepare({ value, label, language }) {
      return {
        title: `${value} ${label}`,
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
