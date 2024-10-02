import React from 'react'
import { CiSearch } from "react-icons/ci";

export default function TableSearch() {
  return (
    <label htmlFor="" className='flex items-center gap-2 w-full md:w-auto px-2 ring-[1.5px] ring-gray-300 rounded-full text-xs'>
      <CiSearch size={14} />
      <input className='w-[200px] p-2 bg-transparent outline-none' type="search" placeholder='Search...' />
    </label>
  )
}
