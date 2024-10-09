import React from 'react'
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Announcement from '@/components/Announcement'
import EventCalendar from '@/components/EventCalendar'
import BigCalendarContainer from '@/components/BigCalendarContainer';

export default async function StudentPage() {
  const { userId } = auth();
  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  return (
    <div className='flex flex-col xl:flex-row gap-4 p-4'>
      <div className=" w-full xl:w-2/3">
        <div className="h-full p-4 rounded-xl bg-white">
          <header>
            <h2 className='text-xl font-semibold'>Schedule <span className='uppercase'>(4a)</span></h2>
          </header>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>
      <aside className='grid gap-8 w-full xl:w-1/3'>
        <EventCalendar />
        <Announcement />
      </aside>
    </div>
  )
}