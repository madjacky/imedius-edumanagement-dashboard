import React from 'react'
import { role, teachersData } from '@/lib/data';
import TableSearch from '@/components/TableSearch'
import { VscSettings } from "react-icons/vsc";
import { FaSortAmountDown } from "react-icons/fa";
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import Image from 'next/image';
import Link from 'next/link';
import { BiShow } from "react-icons/bi";
import FormModal from '@/components/FormModal';

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
}

const columns = [
  {
    header: "Info", 
    accessor: 'info',
  },
  {
    header: "Teacher ID", 
    accessor: 'teacherId', 
    className: "hidden md:table-cell"
  },
  {
    header: "Subjects", 
    accessor: 'subjects', 
    className: "hidden md:table-cell"
  },
  {
    header: "Classes", 
    accessor: 'classes', 
    className: "hidden md:table-cell"
  },
  {
    header: "Phone", 
    accessor: 'phone', 
    className: "hidden lg:table-cell"
  },
  {
    header: "Address", 
    accessor: 'address', 
    className: "hidden lg:table-cell"
  },
  {
    header: "Actions", 
    accessor: 'actions', 
  },
]

export default function TeacherListPage() {

  const renderRow = (item: Teacher) => {
    return (
      <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-imediusPurpleLight'>
        <td className='flex items-center gap-4 p-4'>
          <Image className='h-10 w-10 circle-avatar' src={item.photo} width={48} height={48} alt={item.name} />
          <div className="flex flex-col gap-1">
            <h3 className='font-semibold'>{item.name}</h3>
            <span className='text-xs text-gray-500'>{item?.email}</span>
          </div>
        </td>
        <td className='hidden md:table-cell'>{item.teacherId}</td>
        <td className='hidden md:table-cell'>{item.subjects.join(',')}</td>
        <td className='hidden md:table-cell'>{item.classes.join(',')}</td>
        <td className='hidden md:table-cell'>{item.phone}</td>
        <td className='hidden md:table-cell'>{item.address}</td>
        <td className=''>
          <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${item.id}`} className='flex items-center justify-center h-7 w-7 rounded-full bg-imediusSky'>
              <BiShow className='text-white' size={16} />
              <span className='sr-only'>Show Selected Teacher Single Page</span>
            </Link>
            {role === 'admin' && (
              <FormModal table='teacher' type='delete' id={item.id} />
            )}
          </div>
        </td>
      </tr>
    )
  }

  return (
    <div className='flex flex-col gap-4 flex-1 m-4 mt-0 p-4 rounded-xl bg-white'>
      <header className='flex items-center justify-between'>
        <h2 className='hidden md:block text-lg font-semibold'>All Teachers</h2>
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
              <FormModal table='teacher' type='create' />
            )}
          </div>
        </div>
      </header>
      <Table columns={columns} renderRow={renderRow} data={teachersData} />
      <Pagination />
    </div>
  )
}
