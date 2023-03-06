import Icons from '@/components/Icons'
import { buttonVariants } from '@/components/ui/Button'
import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import Link from 'next/link'
import { FC } from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Similarity API | Page not found',
  description: 'Free & open-source text similarity API',
}

const PageNotFound: FC = () => {
  return (
    <section className='container pt-32 max-w-7xl mx-auto text-center flex flex-col gap-6 items-center'>
      <LargeHeading>Site not found...</LargeHeading>
      <Paragraph>The site you&apos;re searching for does not exist.</Paragraph>
      <Link
        className={buttonVariants({
          variant: 'ghost',
          className: 'w-fit',
        })}
        href='/'>
        <Icons.ChevronLeft className='mr-2 h-4 w-4' />
        Back to home
      </Link>
    </section>
  )
}

export default PageNotFound
