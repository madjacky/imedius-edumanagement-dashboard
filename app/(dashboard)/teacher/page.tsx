import React from 'react'
import { auth } from "@clerk/nextjs/server";
import Announcement from '@/components/Announcement'
import BigCalendarContainer from '@/components/BigCalendarContainer'

export default function TeacherPage() {
  const { userId } = auth();
  return (
    <div className='flex flex-1 flex-col xl:flex-row gap-4 p-4'>
      <div className="w-full xl:w-2/3">
        <div className="h-full p-4 rounded-xl bg-white">
          <header>
            <h2 className='text-xl font-semibold'>Schedule</h2>
          </header>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>
      <aside className='grid self-start gap-8 w-full xl:w-1/3'>
        <Announcement />
      </aside>
    </div>
  )
}
