import React from 'react'
import prisma from "@/lib/prisma";
import { adjustScheduleToCurrentWeek } from '@/lib/utils';
import BigCalendar from './BigCalendar';

export default async function BigCalendarContainer({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) {

  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div>
      <BigCalendar data={schedule} />
    </div>
  )
}