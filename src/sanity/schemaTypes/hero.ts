import { defineType, defineField } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
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
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'microPromise',
      title: 'Micro Promise (small text under CTA)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title: title || 'Hero',
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
