import React from 'react'
import { role, subjectsData } from '@/lib/data';
import TableSearch from '@/components/TableSearch'
import { VscSettings } from "react-icons/vsc";
import { FaSortAmountDown } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
}

const columns = [
  {
    header: "Subject Name", 
    accessor: 'subjectName', 
  },
  {
    header: "Teachers", 
    accessor: 'teachers',
    className: "hidden md:table-cell",
  },
  {
    header: "Actions", 
    accessor: 'actions', 
  },
]

export default function SubjectListPage() {
  const renderRow = (item: Subject) => {
    return (
      <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-imediusPurpleLight'>
        <td className='flex items-center gap-4 p-4'>{item.name}</td>
        <td className='hidden md:table-cell'>{item.teachers.join(',')}</td>
        <td className=''>
          <div className="flex items-center gap-2">
            <Link href={`/list/students/${item.id}`} className='flex items-center justify-center h-7 w-7 rounded-full bg-imediusSky'>
              <FaEdit className='text-white' size={16} />
              <span className='sr-only'>Edit Selected Subject</span>
            </Link>
            {role === 'admin' && (
              <button type='button' className='flex items-center justify-center h-7 w-7 rounded-full bg-imediusPurple'>
                <RiDeleteBin6Line className='text-white' size={16} />
                <span className='sr-only'>Delete Selected Subject from the list</span>
              </button>
            )}
          </div>
        </td>
      </tr>
    )
  }
  return (
    <div className='flex flex-col gap-4 flex-1 m-4 mt-0 p-4 rounded-xl bg-white'>
      <header className='flex items-center justify-between'>
        <h2 className='hidden md:block text-lg font-semibold'>All Subjects</h2>
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
              <button className='flex items-center justify-center h-8 w-8 p-2 rounded-full bg-imediusYellow' type='button'>
                <IoIosAdd size={14} />
                <span className="sr-only">Add Subject button</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <Table columns={columns} renderRow={renderRow} data={subjectsData} />
      <Pagination />
    </div>
  )
}
