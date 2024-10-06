import React from 'react'
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from 'next/link';

export default async function Announcement() {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className='grid gap-4 p-4 rounded-xl bg-white'>
      <header className='flex items-center justify-between'>
        <h3 className='font-semibold text-xl'>Announcements</h3>
        <Link href='/' className='flex items-center justify-center text-xs text-gray-400'>View All</Link>
      </header>
      <div className="grid gap-4">
        {data[0] && (
          <div className="grid gap-1 p-4 bg-imediusSkyLight rounded-xl">
            <header className='flex items-center justify-between'>
              <h3 className='font-medium'>{data[0].title}</h3>
              <span className='px-2 py-1 rounded-md bg-white text-xs text-gray-400'>
                {new Intl.DateTimeFormat("en-GB").format(data[0].date)}
              </span>
            </header>
            <p className='text-sm text-gray-400'>{data[0].description}</p>
          </div>
        )}
        {data[1] && (
          <div className="grid gap-1 p-4 bg-imediusPurpleLight rounded-xl">
            <header className='flex items-center justify-between'>
              <h3 className='font-medium'>{data[1].title}</h3>
              <span className='px-2 py-1 rounded-md bg-white text-xs text-gray-400'>
                {new Intl.DateTimeFormat("en-GB").format(data[1].date)}
              </span>
            </header>
            <p className='text-sm text-gray-400'>{data[1].description}</p>
          </div>
        )}
        {data[2] && (
          <div className="grid gap-1 p-4 bg-imediusYellowLight rounded-xl">
            <header className='flex items-center justify-between'>
              <h3 className='font-medium'>{data[2].title}</h3>
              <span className='px-2 py-1 rounded-md bg-white text-xs text-gray-400'>
                {new Intl.DateTimeFormat("en-GB").format(data[2].date)}
              </span>
            </header>
            <p className='text-sm text-gray-400'>{data[2].description}</p>
          </div>
        )}
      </div>
    </div>
  )
}