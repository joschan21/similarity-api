'use client'

import { Button } from '@/components/ui/Button'
import Paragraph from '@/components/ui/Paragraph'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className='flex flex-col gap-4 items-center'>
      <Paragraph>Something went wrong while loading this page.</Paragraph>
      <Button
        size='lg'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </Button>
    </div>
  )
}
