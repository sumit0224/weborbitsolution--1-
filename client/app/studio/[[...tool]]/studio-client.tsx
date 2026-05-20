'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/src/sanity/sanity.config'

export default function StudioClient() {
  return <NextStudio config={config} />
}
