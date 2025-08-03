import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'bvnhi2h5', // replace with your real project ID
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-06-30',
})

const builder = imageUrlBuilder(sanity)

export function urlFor(source) {
  return builder.image(source)
}
