import { defineType, defineField } from 'sanity'

export const howItWorksStep = defineType({
  name: 'howItWorksStep',
  title: 'How It Works — Steps',
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
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(10),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Step Number',
      name: 'stepAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      step: 'stepNumber',
    },
    prepare({ title, language, step }) {
      return {
        title: `Step ${step}: ${title}`,
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
