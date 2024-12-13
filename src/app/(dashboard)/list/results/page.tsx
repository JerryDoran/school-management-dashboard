import Image from 'next/image';
import { resultsData, role } from '@/lib/data';

import Pagination from '@/components/pagination';
import Table from '@/components/table';
import TableSearch from '@/components/table-search';
import Link from 'next/link';
import FormModal from '@/components/form-modal';

type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  type: 'exam' | 'assignment';
  date: string;
  score: number;
};

const columns = [
  {
    header: 'Subject',
    accessor: 'subject',
  },
  {
    header: 'Student',
    accessor: 'student',
  },
  {
    header: 'Score',
    accessor: 'score',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Teacher',
    accessor: 'teacher',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Class',
    accessor: 'class',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Date',
    accessor: 'date',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
];

export default function ResultsListPage() {
  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-maestroPurpleLight'
    >
      <td className='flex items-center p-4 gap-4 '>{item.subject}</td>
      <td>{item.student}</td>
      <td className='hidden md:table-cell'>{item.score}</td>
      <td className='hidden md:table-cell'>{item.teacher}</td>
      <td className='hidden md:table-cell'>{item.class}</td>
      <td className='hidden md:table-cell'>{item.date}</td>
      <td>
        <div className='flex items-center gap-2'>
          {role === 'admin' && (
            <>
              <FormModal
                table='result'
                type='update'
                data={item}
                id={item.id}
              />
              <FormModal table='result' type='delete' id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <section className='bg-white p-4 flex-1 rounded-md m-4 mt-0'>
      {/* Top Section */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>
          All Assignments
        </h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='size-8 flex items-center justify-center rounded-full bg-maestroYellow'>
              <Image src='/filter.png' alt='filter' width={14} height={14} />
            </button>
            <button className='size-8 flex items-center justify-center rounded-full bg-maestroYellow'>
              <Image src='/sort.png' alt='filter' width={14} height={14} />
            </button>
            {role === 'admin' && <FormModal table='assignment' type='create' />}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={resultsData} />
      {/* Pagination */}
      <Pagination />
    </section>
  );
}
