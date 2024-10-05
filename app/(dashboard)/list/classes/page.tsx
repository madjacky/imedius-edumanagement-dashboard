import React from 'react'
import { role } from '@/lib/data';
import TableSearch from '@/components/TableSearch'
import { VscSettings } from "react-icons/vsc";
import { FaSortAmountDown } from "react-icons/fa";
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';

import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Teacher } from "@prisma/client";

type ClassList = Class & { supervisor: Teacher };

const columns = [
  {
    header: "Class Name", 
    accessor: 'className', 
  },
  {
    header: "Capacity", 
    accessor: 'capacity',
    className: "hidden md:table-cell",
  },
  {
    header: "Grade", 
    accessor: 'grade',
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor", 
    accessor: 'supervisor',
    className: "hidden md:table-cell",
  },
  {
    header: "Actions", 
    accessor: 'actions', 
  },
]

export default async function ClassListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  const renderRow = (item: ClassList) => {
    return (
      <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-imediusPurpleLight'>
        <td className='flex items-center gap-4 p-4'>{item.name}</td>
        <td className='hidden md:table-cell'>{item.capacity}</td>
        <td className='hidden md:table-cell'>{item.name[0]}</td>
        <td className='hidden md:table-cell'>{item.supervisor.name + " " + item.supervisor.surname}</td>
        <td className=''>
          <div className="flex items-center gap-2">
            {role === 'admin' && (
              <>
                <FormModal table="class" type="update" data={item} />
                <FormModal table="class" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    )
  }

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.class.count({ where: query }),
  ]);

  return (
    <div className='flex flex-col gap-4 flex-1 m-4 mt-0 p-4 rounded-xl bg-white'>
      <header className='flex items-center justify-between'>
        <h2 className='hidden md:block text-lg font-semibold'>All Classess</h2>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center self-end gap-4">
            <button className='flex items-center justify-center h-8 w-8 p-2 rounded-full bg-imediusYellow' type='button'>
              <VscSettings size={14} />
              <span className="sr-only">Edit button</span>
            </button>
            <button className='flex items-center justify-center h-8 w-8 p-2 rounded-full bg-imediusYellow' type='button'>
              <FaSortAmountDown size={14} />
              <span className="sr-only">Sort button</span>
            </button>
            {role === 'admin' && (
              <FormModal table="class" type="create" />
            )}
          </div>
        </div>
      </header>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  )
}
