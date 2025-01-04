import Image from 'next/image';
import { parentsData, role } from '@/lib/data';

import Pagination from '@/components/pagination';
import Table from '@/components/table';
import TableSearch from '@/components/table-search';
import FormModal from '@/components/form-modal';
import prisma from '@/lib/prisma';
import { Parent, Prisma, Student } from '@prisma/client';
import { ITEMS_PER_PAGE } from '@/lib/constants';

type ParentList = Parent & {
  students: Student[];
};

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Student Names',
    accessor: 'students',
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

const renderRow = (item: ParentList) => (
  <tr
    key={item.id}
    className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-maestroPurpleLight'
  >
    <td className='flex items-center p-4 gap-4 '>
      <div className='flex flex-col'>
        <h3 className='font-semibold'>
          {item.firstname} {item.lastname}
        </h3>
        <p className='text-xs text-gray-500'>{item.email}</p>
      </div>
    </td>
    <td className='hidden md:table-cell'>
      {item.students.map((student) => student.firstname).join(', ')}
    </td>
    <td className='hidden lg:table-cell'>{item.phone}</td>
    <td className='hidden lg:table-cell'>{item.address}</td>
    <td>
      <div className='flex items-center gap-2'>
        {role === 'admin' && (
          <>
            <FormModal table='parent' type='update' data={item} id={item.id} />
            <FormModal table='parent' type='delete' id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

export default async function ParentListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // URL params conditions
  const query: Prisma.ParentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
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
  const [parentsData, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: {
        students: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1),
    }),
    prisma.parent.count({
      where: query,
    }),
  ]);
  return (
    <section className='bg-white p-4 flex-1 rounded-md m-4 mt-0'>
      {/* Top Section */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Parents</h1>
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
              <FormModal table='parent' type='create' />
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={parentsData} />
      {/* Pagination */}
      <Pagination count={count} page={currentPage} />
    </section>
  );
}
