import Announcement from '@/components/Announcement'
import AttendanceChartContainer from '@/components/AttendanceChartContainer'
import CountChartContainer from '@/components/CountChartContainer'
import EventCalendarContainer from '@/components/EventCalendarContainer'
import FinanceChart from '@/components/FinanceChart'
import UserCard from '@/components/UserCard'
import React from 'react'

export default function AdminPage({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) {
  return (
    <div className='flex flex-col md:flex-row gap-4 p-4'>
      <div className="grid gap-8 w-full lg:w-2/3">
        <div className="flex flex-wrap justify-between gap-4">
          <UserCard type='admin' />
          <UserCard type='teacher' />
          <UserCard type='student' />
          <UserCard type='parent' />
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="h-[450px] w-full lg:w-1/3">
            <CountChartContainer />
          </div>
          <div className="h-[450px] w-full lg:w-2/3">
            <AttendanceChartContainer />
          </div>
        </div>
        <div className="h-[500px] w-full">
          <FinanceChart />
        </div>
      </div>
      <aside className='grid gap-8 w-full lg:w-1/3'>
        <EventCalendarContainer searchParams={searchParams} />
        <Announcement />
      </aside>
    </div>
  )
}