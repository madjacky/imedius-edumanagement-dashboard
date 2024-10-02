import React from 'react'
import Link from 'next/link'

export default function Pagination() {
  return (
    <div className='flex items-center justify-between gap-4 text-gray-500'>
      <button type='button' className='py-2 px-4 rounded-md bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed' disabled>Prev</button>
      <ul className='flex items-center gap-2 text-sm' role='list'>
        <li><Link href='/' className='px-2 rounded-sm bg-imediusSky'>1</Link></li>
        <li><Link href='/' className='px-2 rounded-sm'>2</Link></li>
        <li><Link href='/' className='px-2 rounded-sm'>3</Link></li>
        <li><Link href='/' className='px-2 rounded-sm'>...</Link></li>
        <li><Link href='/' className='px-2 rounded-sm'>10</Link></li>
      </ul>
      <button type='button'  className='py-2 px-4 rounded-md bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'>Next</button>
    </div>
  )
}
