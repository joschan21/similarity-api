import Paragraph from '@/components/ui/Paragraph'
import { Loader2 } from 'lucide-react'

const Loading = async () => {
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center'>
      <Paragraph>Preparing your dashboard</Paragraph>
      <Loader2 className='animate-spin h-10 w-10 dark:text-slate-200' />
    </div>
  )
}

export default Loading
