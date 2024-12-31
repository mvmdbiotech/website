import type { CollectionConfig } from 'payload'

export const PressReleases: CollectionConfig = {
  slug: 'press-releases',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    }
  ]
}