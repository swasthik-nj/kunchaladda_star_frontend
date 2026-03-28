import React from 'react'
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://kunchaladda-star-frontend.vercel.app'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

export default function SeoMeta({
  title,
  description,
  path = '/',
  canonicalPath,
  image = DEFAULT_IMAGE,
  noindex = false,
}) {
  const canonical = `${SITE_URL}${canonicalPath || path}`
  const robots = noindex ? 'noindex, nofollow' : 'index, follow'

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content={robots} />
      <link rel='canonical' href={canonical} />

      <meta property='og:type' content='website' />
      <meta property='og:locale' content='en_IN' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={canonical} />
      <meta property='og:image' content={image} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Helmet>
  )
}
