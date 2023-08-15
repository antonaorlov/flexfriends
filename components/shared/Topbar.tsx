import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {dark } from '@clerk/themes'
const Topbar = () => {
  return (
    <nav className='topbar'>
      <Link href='/' className='flex items-center gap-4'>
        <p className='text-heading3-bold text-justify text-light-1'>Threads</p>
      </Link>

      <div className='flex items-center gap-1 text-white'>
        <div>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer px-3 md:hidden'>
                <Image
                  src='/assets/logout.svg'
                  alt='logout'
                  width={27}
                  height={27}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        {/* <div className='invisible max-[390]:visible'> */}
        <OrganizationSwitcher
          appearance={{
            baseTheme:dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
        {/* </div> */}
      </div>
    </nav>
  )
}

export default Topbar