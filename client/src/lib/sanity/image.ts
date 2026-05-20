import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from './client'

const builder = createImageUrlBuilder({
  projectId: projectId || 'missing-project-id',
  dataset,
})

export function urlForImage(source: unknown) {
  if (!source || !projectId) {
    return null
  }

  return builder.image(source as any).auto('format')
}

export function getSanityImageUrl(
  source: unknown,
  width: number,
  height?: number,
): string | null {
  const image = urlForImage(source)

  if (!image) {
    return null
  }

  const transformed = image.width(width)
  return height ? transformed.height(height).url() : transformed.url()
}
