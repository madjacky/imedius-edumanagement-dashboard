import React from 'react'
import EventCalendar from './EventCalendar';
import EventList from './EventList';

import Link from 'next/link';
import { IoIosMore } from "react-icons/io";

export default async function EventCalendarContainer({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) {

  const { date } = searchParams;

  return (
    <div className='grid gap-4 p-4 rounded-xl bg-white'>
      <EventCalendar />
      <header className='flex items-center justify-between'>
        <h3 className='font-semibold text-xl'>Events</h3>
        <Link href='/' className='flex items-center justify-center'>
          <IoIosMore className='text-black' size={20} />
        </Link>
      </header>
      <div className="grid gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  )
}
