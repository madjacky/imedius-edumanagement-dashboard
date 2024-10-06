'use client'
import React, { useEffect } from 'react'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {

  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className='grid place-content-center h-svh bg-imediusSkyLight'>
      <SignIn.Root>
        <SignIn.Step name='start' className='grid gap-8 p-12 rounded-xl bg-white shadow-2xl'>
          <header className='flex flex-col justify-center items-center gap-2 text-center'>
            <Image src='/images/logo.png' width={48} height={48} alt='Imedius EduManagement' />
            <h1 className='font-bold text-xl'>Imedius EduManagement</h1>
            <p className='text-gray-400'>Sign in to your Account</p>
          </header>
          <Clerk.GlobalError className='text-xs text-red-500' />
          <Clerk.Field className='grid gap-2' name="identifier">
            <Clerk.Label className='text-xs text-gray-500'>Username</Clerk.Label>
            <Clerk.Input className='w-full p-2 rounded-md ring-1 ring-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300' type='text' required />
            <Clerk.FieldError className='text-xs text-red-500' />
          </Clerk.Field>
          <Clerk.Field className='gird gap-2' name="password">
            <Clerk.Label className='text-xs text-gray-500'>Pssword</Clerk.Label>
            <Clerk.Input className='w-full p-2 rounded-md ring-1 ring-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300' type='password' required />
            <Clerk.FieldError className='text-xs text-red-500' />
          </Clerk.Field>
          <SignIn.Action className='inline-block text-center rounded-md py-2 px-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-300 text-white font-semibold text-sm' submit>Sign in</SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  )
}
