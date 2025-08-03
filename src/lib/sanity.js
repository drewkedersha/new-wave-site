// src/lib/sanity.js
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'bvnhi2h5',           // hardcoded
  dataset: 'production',
  apiVersion: '2024-06-30',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // can stay dynamic
})

const builder = imageUrlBuilder(sanity)

export function urlFor(source) {
  return builder.image(source)
}
