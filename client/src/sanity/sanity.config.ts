'use client'

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Web Orbit Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [deskTool({ structure })],
  schema: {
    types: schemaTypes,
  },
})
