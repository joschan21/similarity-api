'use client'

import Code from '@/components/ui/Code'
import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { nodejs, python } from '@/helpers/documentation-code'
import { FC } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className='container max-w-7xl mx-auto mt-12'>
      <div className='flex flex-col items-center gap-6'>
        <LargeHeading>Making a request</LargeHeading>
        <Paragraph>api/v1/similarity</Paragraph>

        <Tabs defaultValue='nodejs' className='max-w-2xl w-full'>
          <TabsList>
            <TabsTrigger value='nodejs'>NodeJS</TabsTrigger>
            <TabsTrigger value='python'>Python</TabsTrigger>
          </TabsList>
          <TabsContent value='nodejs'>
            <SimpleBar forceVisible='y'>
              <Code animated code={nodejs} language='javascript' show />
            </SimpleBar>
          </TabsContent>
          <TabsContent value='python'>
            <SimpleBar forceVisible='y'>
              <Code animated code={python} language='python' show />
            </SimpleBar>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default page
