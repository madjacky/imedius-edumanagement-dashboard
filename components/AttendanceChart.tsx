'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AttendanceChart({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart
        width={500}
        height={300}
        data={data}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='oklch(87.17% 0.009 258.34)' />
        <XAxis axisLine={false} dataKey="name" tick={{fill:"oklch(92.76% 0.006 264.53)"}} tickLine={false} />
        <YAxis axisLine={false} tick={{fill:"oklch(92.76% 0.006 264.53)"}} tickLine={false} />
        <Tooltip cursor={{fill:"oklch(96.7% 0.003 264.54)"}} contentStyle={{borderRadius:"10px", borderColor:"lightgrey"}} />
        <Legend align='left' verticalAlign='top' wrapperStyle={{paddingBlock:"20px 40px"}} />
        <Bar legendType='circle' radius={[10,10,0,0]} dataKey="absent" fill="oklch(90.14% 0.055 230.9)"  />
        <Bar legendType='circle' radius={[10,10,0,0]} dataKey="present" fill="oklch(92.43% 0.115 95.75)"  />
      </BarChart>
    </ResponsiveContainer>
  )
}
