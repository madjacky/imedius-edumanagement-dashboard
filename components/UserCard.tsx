import React from 'react'
import prisma from "@/lib/prisma";

import Link from 'next/link';
import { IoIosMore } from "react-icons/io";

export default async function UserCard({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) {

  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };
  const data = await modelMap[type].count();
  
  return (
    <article className='grid gap-4 flex-1 min-w-[130px] p-4 rounded-2xl odd:bg-imediusPurple even:bg-imediusYellow'>
      <header className='flex items-center justify-between'>
        <span className='py-1 px-2 rounded-full bg-white text-[.625rem] text-green-600'>2024/25</span>
        <Link href='/' className='flex items-center justify-center'>
          <IoIosMore className='text-white' size={20} />
        </Link>
      </header>
      <h3 className='font-semibold text-2xl'>{data}</h3>
      <h4 className='font-medium text-sm capitalize text-gray-500'>{type}</h4>
    </article>
  )
}