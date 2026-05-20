import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set(['seoSettings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('SEO Settings')
        .id('seoSettings')
        .child(S.document().schemaType('seoSettings').documentId('seoSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => !singletonTypes.has(listItem.getId() || '')),
    ])
