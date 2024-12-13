import Image from 'next/image';
import { teachersData, role } from '@/lib/data';

import Pagination from '@/components/pagination';
import Table from '@/components/table';
import TableSearch from '@/components/table-search';
import Link from 'next/link';
import FormModal from '@/components/form-modal';

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  subjects: string[];
  classes: string[];
  phone: string;
  address: string;
};

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Teacher ID',
    accessor: 'teachderId',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Subjects',
    accessor: 'subjects',
    className: 'hidden md:table-cell',
  },

  {
    header: 'Classes',
    accessor: 'classes',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Phone',
    accessor: 'phone',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Address',
    accessor: 'address',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
];

export default function TeacherListPage() {
  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-maestroPurpleLight'
    >
      {/* <div className='text-left flex bg-red-500 items-center w-full justify-between'> */}
      <td className='flex items-center p-4 gap-4 '>
        <Image
          src={item.photo}
          alt='profile picture'
          width={40}
          height={40}
          className='md:hidden xl:block size-10 rounded-full object-cover'
        />
        <div className='flex flex-col'>
          <h3 className='font-semibold'>{item.name}</h3>
          <p className='text-xs text-gray-500'>{item.email}</p>
        </div>
      </td>
      <td className='hidden md:table-cell'>{item.teacherId}</td>
      <td className='hidden md:table-cell'>{item.subjects.join(',')}</td>
      <td className='hidden md:table-cell'>{item.classes.join(',')}</td>
      <td className='hidden lg:table-cell'>{item.phone}</td>
      <td className='hidden lg:table-cell'>{item.address}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/teachers/${item.id}`}>
            <button className='size-7 flex items-center justify-center rounded-full bg-maestroSky'>
              <Image src='/view.png' alt='view' width={16} height={16} />
            </button>
          </Link>
          {role === 'admin' && (
            // <button className='size-7 flex items-center justify-center rounded-full bg-maestroPurple'>
            //   <Image src='/delete.png' alt='view' width={16} height={16} />
            // </button>
            <FormModal table='teacher' type='delete' id={item.id} />
          )}
        </div>
      </td>
      {/* </div> */}
    </tr>
  );
  return (
    <section className='bg-white p-4 flex-1 rounded-md m-4 mt-0'>
      {/* Top Section */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Teachers</h1>
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
              // <button className='size-8 flex items-center justify-center rounded-full bg-maestroYellow'>
              //   <Image src='/plus.png' alt='filter' width={14} height={14} />
              // </button>
              <FormModal table='teacher' type='create' />
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={teachersData} />
      {/* Pagination */}
      <Pagination />
    </section>
  );
}
