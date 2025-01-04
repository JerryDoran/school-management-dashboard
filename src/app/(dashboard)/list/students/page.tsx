import Image from 'next/image';
import { studentsData, role } from '@/lib/data';

import Pagination from '@/components/pagination';
import Table from '@/components/table';
import TableSearch from '@/components/table-search';
import Link from 'next/link';
import FormModal from '@/components/form-modal';
import { Class, Prisma, Student } from '@prisma/client';
import prisma from '@/lib/prisma';
import { ITEMS_PER_PAGE } from '@/lib/constants';

type StudentList = Student & {
  class: Class;
};

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Student ID',
    accessor: 'studentId',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Grade',
    accessor: 'grade',
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

const renderRow = (item: StudentList) => (
  <tr
    key={item.id}
    className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-maestroPurpleLight'
  >
    <td className='flex items-center p-4 gap-4 '>
      <Image
        src={item.image || '/noAvatar.png'}
        alt='profile picture'
        width={40}
        height={40}
        className='md:hidden xl:block size-10 rounded-full object-cover'
      />
      <div className='flex flex-col'>
        <h3 className='font-semibold'>
          {item.firstname} {item.lastname}
        </h3>
        <p className='text-xs text-gray-500'>{item.class.name}</p>
      </div>
    </td>
    <td className='hidden md:table-cell'>{item.username}</td>
    <td className='hidden md:table-cell'>{item.class.name[0]}</td>
    <td className='hidden lg:table-cell'>{item.phone}</td>
    <td className='hidden lg:table-cell'>{item.address}</td>
    <td>
      <div className='flex items-center gap-2'>
        <Link href={`/list/students/${item.id}`}>
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-maestroSky'>
            <Image src='/view.png' alt='view' width={16} height={16} />
          </button>
        </Link>
        {role === 'admin' && (
          <FormModal table='student' type='delete' id={item.id} />
        )}
      </div>
    </td>
  </tr>
);

export default async function StudentListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // URL params conditions
  const query: Prisma.StudentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'teacherId':
            {
              query.class = {
                lessons: {
                  some: {
                    teacherId: value,
                  },
                },
              };
            }
            break;
          case 'search':
            {
              query.lastname = {
                contains: value,
                mode: 'insensitive',
              };
            }
            break;
          default:
            break;
        }
      }
    }
  }

  // use transaction to get students and count in one query
  const [studentsData, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1),
    }),
    prisma.student.count({
      where: query,
    }),
  ]);
  return (
    <section className='bg-white p-4 flex-1 rounded-md m-4 mt-0'>
      {/* Top Section */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Students</h1>
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
              <FormModal table='student' type='create' />
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
      {/* Pagination */}
      <Pagination page={currentPage} count={count} />
    </section>
  );
}
