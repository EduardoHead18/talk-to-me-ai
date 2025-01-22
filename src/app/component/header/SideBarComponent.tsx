import Link from 'next/link'
import React from 'react'

export const SideBarComponent = () => {
  return (
    <>
    <h1 className='text-xl text-center font-bold'>Setting</h1>

    <div>
   
    <ul className='space-y-10 px-3 mt-10'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/account">Account</Link></li>
          <li><Link href="/configuration-prompt-page/">Configuration prompt</Link></li>
        </ul>
    </div>
    </>
  )
}
