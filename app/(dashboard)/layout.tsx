import React from 'react'
import type { Metadata } from "next";
import "@/styles/main.scss";
import Link from 'next/link';
import Image from 'next/image';
import Menu from '@/components/Menu';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-svh min-h-svh flex">
      <aside className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 bg-white">
        <Link href='/' className='flex items-center justify-center lg:justify-start gap-2'>
          <Image src='/images/logo.png' width={32} height={32} alt='Logo' />
          <span className='hidden lg:block font-bold'>ImediusSchool</span>
        </Link>
        <Navigation />
      </aside>
      <main className="flex flex-col w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-scroll dashboard-bg">
        <Menu />
        {children}
      </main>
    </div>
  );
}