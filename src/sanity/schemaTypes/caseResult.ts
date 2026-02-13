import { defineType, defineField } from 'sanity'

export const caseResult = defineType({
  name: 'caseResult',
  title: 'Case Results',
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
      name: 'text',
      title: 'Result Description',
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
      title: 'text',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title: title?.slice(0, 80) || 'Case Result',
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
