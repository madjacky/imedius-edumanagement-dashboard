import React from 'react'
import prisma from "@/lib/prisma";
import CountChart from './CountChart';

import Link from 'next/link';
import { IoIosMore } from "react-icons/io";

export default async function CountChartContainer() {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return (
    <div className='h-full w-full p-4 rounded-xl bg-white'>
      <header className='flex items-center justify-between'>
        <h3 className='font-semibold text-xl'>Students</h3>
        <Link href='/' className='flex items-center justify-center'>
          <IoIosMore className='text-black' size={20} />
        </Link>
      </header>
      <CountChart boys={boys} girls={girls} />
      <footer className='flex justify-center gap-16'>
        <div className="grid justify-items-center gap-1">
          <div className="h-5 w-5 rounded-full bg-imediusSky">
            <span className="sr-only">decorative circle</span>
          </div>
          <span className='font-bold'>{boys}</span>
          <span className='text-xs text-green-300'>Boys ({Math.round((boys / (boys + girls)) * 100)}%)</span>
        </div>
        <div className="grid justify-items-center gap-1">
          <div className="h-5 w-5 rounded-full bg-imediusYellow">
            <span className="sr-only">decorative circle</span>
          </div>
          <span className='font-bold'>{girls}</span>
          <span className='text-xs text-green-300'>Girls ({Math.round((girls / (boys + girls)) * 100)}%)</span>
        </div>
      </footer>
    </div>
  )
}
