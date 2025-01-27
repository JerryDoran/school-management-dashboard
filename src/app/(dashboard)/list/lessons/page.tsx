import Image from 'next/image';
import { lessonsData, role } from '@/lib/data';

import Pagination from '@/components/pagination';
import Table from '@/components/table';
import TableSearch from '@/components/table-search';
import Link from 'next/link';
import FormModal from '@/components/form-modal';
import { Class, Lesson, Prisma, Subject, Teacher } from '@prisma/client';
import prisma from '@/lib/prisma';
import { ITEMS_PER_PAGE } from '@/lib/constants';

type LessonList = Lesson & { subject: Subject } & { class: Class } & {
  teacher: Teacher;
};

const columns = [
  {
    header: 'Subject',
    accessor: 'subject',
  },
  {
    header: 'Class',
    accessor: 'class',
  },
  {
    header: 'Teacher',
    accessor: 'teacher',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
];

const renderRow = (item: LessonList) => (
  <tr
    key={item.id}
    className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-maestroPurpleLight'
  >
    <td className='flex items-center p-4 gap-4 '>{item.subject.name}</td>
    <td>{item.class.name}</td>
    <td className='hidden md:table-cell'>
      {item.teacher.firstname} {item.teacher.lastname}
    </td>
    <td>
      <div className='flex items-center gap-2'>
        {role === 'admin' && (
          <>
            <FormModal table='lesson' type='update' data={item} id={item.id} />
            <FormModal table='lesson' type='delete' id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

export default async function LessonsListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // URL params conditions
  const query: Prisma.LessonWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'classId':
            {
              query.classId = parseInt(value);
            }
            break;
          case 'teacherId':
            {
              query.teacherId = value;
            }
            break;
          case 'search':
            {
              query.OR = [
                { subject: { name: { contains: value, mode: 'insensitive' } } },
                {
                  teacher: {
                    lastname: { contains: value, mode: 'insensitive' },
                  },
                },
                {
                  teacher: {
                    firstname: { contains: value, mode: 'insensitive' },
                  },
                },
              ];
            }
            break;
          default:
            break;
        }
      }
    }
  }

  const [lessonsData, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { firstname: true, lastname: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1),
    }),
    prisma.lesson.count({
      where: query,
    }),
  ]);
  return (
    <section className='bg-white p-4 flex-1 rounded-md m-4 mt-0'>
      {/* Top Section */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Lessons</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='size-8 flex items-center justify-center rounded-full bg-maestroYellow'>
              <Image src='/filter.png' alt='filter' width={14} height={14} />
            </button>
            <button className='size-8 flex items-center justify-center rounded-full bg-maestroYellow'>
              <Image src='/sort.png' alt='filter' width={14} height={14} />
            </button>
            {role === 'admin' && <FormModal table='lesson' type='create' />}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={lessonsData} />
      {/* Pagination */}
      <Pagination page={currentPage} count={count} />
    </section>
  );
}
