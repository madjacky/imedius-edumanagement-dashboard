import React from 'react'
import { role, assignmentsData } from '@/lib/data';
import TableSearch from '@/components/TableSearch'
import { VscSettings } from "react-icons/vsc";
import { FaSortAmountDown } from "react-icons/fa";
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';

type Assignment = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

const columns = [
  {
    header: "Subject Name", 
    accessor: 'subjectName', 
  },
  {
    header: "Class", 
    accessor: 'class',
  },
  {
    header: "Teacher", 
    accessor: 'teacher',
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date", 
    accessor: 'dueDate',
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
]

export default function AssignmentListPage() {
  const renderRow = (item: Assignment) => {
    return (
      <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-imediusPurpleLight'>
        <td className='flex items-center gap-4 p-4'>{item.subject}</td>
        <td>{item.class}</td>
        <td className='hidden md:table-cell'>{item.teacher}</td>
        <td className='hidden md:table-cell'>{item.dueDate}</td>
        <td>
          <div className="flex items-center gap-2">
            {(role === "admin" || role === "teacher") && (
              <>
                <FormModal table="assignment" type="update" data={item} />
                <FormModal table="assignment" type="delete" id={item.id} />
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
        <h2 className='hidden md:block text-lg font-semibold'>All Assignments</h2>
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
            {(role === "admin") || (role === "teacher" && <FormModal table="assignment" type="create" />)}
          </div>
        </div>
      </header>
      <Table columns={columns} renderRow={renderRow} data={assignmentsData} />
      <Pagination />
    </div>
  )
}
