import Image from 'next/image';
import { classesData, role } from '@/lib/data';

import Pagination from '@/components/pagination';
import Table from '@/components/table';
import TableSearch from '@/components/table-search';
import Link from 'next/link';

type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

const columns = [
  {
    header: 'Class Name',
    accessor: 'subject',
  },
  {
    header: 'Capacity',
    accessor: 'capacity',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Grade',
    accessor: 'grade',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Supervisor',
    accessor: 'supervisor',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
];

export default function ClassesListPage() {
  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-maestroPurpleLight'
    >
      <td className='flex items-center p-4 gap-4 '>{item.name}</td>
      <td className='hidden md:table-cell'>{item.capacity}</td>
      <td className='hidden md:table-cell'>{item.grade}</td>
      <td className='hidden md:table-cell'>{item.supervisor}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/teachers/${item.id}`}>
            <button className='size-7 flex items-center justify-center rounded-full bg-maestroSky'>
              <Image src='/edit.png' alt='view' width={16} height={16} />
            </button>
          </Link>
          {role === 'admin' && (
            <button className='size-7 flex items-center justify-center rounded-full bg-maestroPurple'>
              <Image src='/delete.png' alt='view' width={16} height={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <section className='bg-white p-4 flex-1 rounded-md m-4 mt-0'>
      {/* Top Section */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Classes</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='size-8 flex items-center justify-center rounded-full bg-maestroYellow'>
              <Image src='/filter.png' alt='filter' width={14} height={14} />
            </button>
            <button className='size-8 flex items-center justify-center rounded-full bg-maestroYellow'>
              <Image src='/sort.png' alt='filter' width={14} height={14} />
            </button>
            {role === 'admin' && (
              <button className='size-8 flex items-center justify-center rounded-full bg-maestroYellow'>
                <Image src='/plus.png' alt='filter' width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={classesData} />
      {/* Pagination */}
      <Pagination />
    </section>
  );
}
