import React from 'react'
import prisma from "@/lib/prisma";

export default async function EventList({ dateParam }: { dateParam: string | undefined }) {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });
  return data.map((event) => (
    <div key={event.id} className="p-5 rounded-xl border-2 border-t-4 border-gray-100 odd:border-t-imediusSky even:border-t-imediusPurple">
      <header className='flex items-center justify-between'>
        <h3 className='font-semibold text-gray-600'>{event.title}</h3>
        <span className='text-xs text-gray-300'>
          {event.startTime.toLocaleTimeString("en-GE", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </header>
      <p className="mt-2 text-sm text-gray-400">{event.description}</p>
    </div>
  ));
};
