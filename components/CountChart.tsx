'use client'
import React from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

export default function CountChart({ boys, girls }: { boys: number; girls: number }) {
  const data = [
    {
      name: 'Total',
      count: boys+girls,
      fill: 'oklch(100% 0 0)',
    },
    {
      name: 'Girls',
      count: girls,
      fill: 'oklch(92.43% 0.115 95.75)',
    },
    {
      name: 'Boys',
      count: boys,
      fill: 'oklch(90.14% 0.055 230.9)',
    },
  ];

  return (
    <div className="relative h-[75%] w-full">
      <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            background
            dataKey="count"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <Image className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' src='/images/malefemale.png' width={50} height={50} alt='Male & Female' />
    </div>
  )
}
