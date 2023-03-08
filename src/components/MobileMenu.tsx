'use client'

import { Info, LayoutDashboard, Loader2, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu'
import { toast } from './ui/toast'

const MobileMenu = () => {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const signUserOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
    } catch (error) {
      toast({
        title: 'Error signing out',
        message: 'Please try again later.',
        type: 'error',
      })
    }
  }

  return (
    <nav className='md:hidden fixed z-50 bottom-20 right-0 left-0 flex justify-center'>
      <div className='shadow-2xl rounded-md outline outline-2 outline-white dark:outline-slate-900'>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild onClick={() => setOpen((prev) => !prev)}>
            <Button variant='outline' size='lg'>
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuGroup onClick={() => setOpen(false)}>
              <DropdownMenuItem asChild>
                {session ? (
                  <Link
                    href='/dashboard'
                    className='w-full flex items-center gap-1.5'>
                    <LayoutDashboard className='mr-2 h-5 w-5' />
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href='/login'
                    className='flex w-full items-center gap-1.5'>
                    <LayoutDashboard className='mr-2 h-5 w-5' />
                    <span>Sign in</span>
                  </Link>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href='/documentation'
                  className='w-full flex items-center gap-1.5'>
                  <Info className='mr-2 h-5 w-5' />
                  <span>Docs</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signUserOut} className='gap-1.5'>
                <User className='mr-2 h-5 w-5' />
                <span>{isLoading ? 'Signing out' : 'Sign out'}</span>
                {isLoading ? (
                  <Loader2 className='animate-spin h-4 w-4' />
                ) : null}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default MobileMenu
