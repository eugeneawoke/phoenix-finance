import { type SchemaTypeDefinition } from 'sanity'
import { hero } from './hero'
import { service } from './service'
import { testimonial } from './testimonial'
import { caseResult } from './caseResult'
import { faqItem } from './faqItem'
import { stat } from './stat'
import { companyInfo } from './companyInfo'
import { aboutValue } from './aboutValue'
import { howItWorksStep } from './howItWorksStep'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    service,
    testimonial,
    caseResult,
    faqItem,
    stat,
    companyInfo,
    aboutValue,
    howItWorksStep,
  ],
}
