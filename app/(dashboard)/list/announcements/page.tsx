import React from 'react'
import { role, announcementsData } from '@/lib/data';
import TableSearch from '@/components/TableSearch'
import { VscSettings } from "react-icons/vsc";
import { FaSortAmountDown } from "react-icons/fa";
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';

type Announcement = {
  id: number;
  title: string;
  class: string;
  date: string;
}

const columns = [
  {
    header: "Title", 
    accessor: 'title', 
  },
  {
    header: "Class", 
    accessor: 'class',
  },
  {
    header: "Date", 
    accessor: 'teacher',
    className: "hidden md:table-cell",
  },
  {
    header: "Actions", 
    accessor: 'actions', 
  },
]

export default function AnnouncementListPage() {
  const renderRow = (item: Announcement) => {
    return (
      <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-imediusPurpleLight'>
        <td className='flex items-center gap-4 p-4'>{item.title}</td>
        <td>{item.class}</td>
        <td className='hidden md:table-cell'>{item.date}</td>
        <td className=''>
          <div className="flex items-center gap-2">
            {role === 'admin' && (
              <>
                <FormModal table="announcement" type="update" data={item} />
                <FormModal table="announcement" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    )
  }
  return (
    <div className='flex flex-col gap-4 flex-1 m-4 mt-0 p-4 rounded-xl bg-white'>
      <header className='flex items-center justify-between'>
        <h2 className='hidden md:block text-lg font-semibold'>All Announcements</h2>
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
              <FormModal table="announcement" type="create" />
            )}
          </div>
        </div>
      </header>
      <Table columns={columns} renderRow={renderRow} data={announcementsData} />
      <Pagination />
    </div>
  )
}
