import Image from 'next/image';
import { classesData, role } from '@/lib/data';

import Pagination from '@/components/pagination';
import Table from '@/components/table';
import TableSearch from '@/components/table-search';
import FormModal from '@/components/form-modal';
import { Class, Prisma, Teacher } from '@prisma/client';
import prisma from '@/lib/prisma';
import { ITEMS_PER_PAGE } from '@/lib/constants';

type ClassList = Class & {
  supervisor: Teacher;
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

const renderRow = (item: ClassList) => (
  <tr
    key={item.id}
    className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-maestroPurpleLight'
  >
    <td className='flex items-center p-4 gap-4 '>{item.name}</td>
    <td className='hidden md:table-cell'>{item.capacity}</td>
    <td className='hidden md:table-cell'>{item.name[0]}</td>
    <td className='hidden md:table-cell'>
      {item.supervisor.firstname + ' ' + item.supervisor.lastname}
    </td>
    <td>
      <div className='flex items-center gap-2'>
        {role === 'admin' && (
          <>
            <FormModal table='class' type='update' data={item} id={item.id} />
            <FormModal table='class' type='delete' id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

export default async function ClassesListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // URL params conditions
  const query: Prisma.ClassWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'supervisorId':
            {
              query.supervisorId = value;
            }
            break;
          case 'search':
            {
              query.name = {
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

  const [classesData, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1),
    }),
    prisma.class.count({
      where: query,
    }),
  ]);
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
            {role === 'admin' && <FormModal table='class' type='create' />}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={classesData} />
      {/* Pagination */}
      <Pagination count={count} page={currentPage} />
    </section>
  );
}
