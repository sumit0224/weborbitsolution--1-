import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { caseStudies } from '@/data/case-studies'
import { CaseStudyDetail } from './case-study-detail'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = caseStudies.find((p) => p.slug === slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Case Studies`,
    description: project.description,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = caseStudies.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://weborbitsolution.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: 'https://weborbitsolution.in/case-studies',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `https://weborbitsolution.in/case-studies/${project.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main>
        <CaseStudyDetail project={project} />
      </main>
      <Footer />
    </>
  )
}
