import Image from 'next/image';
import { examsData, role } from '@/lib/data';

import Pagination from '@/components/pagination';
import Table from '@/components/table';
import TableSearch from '@/components/table-search';
import Link from 'next/link';
import FormModal from '@/components/form-modal';
import prisma from '@/lib/prisma';
import { Class, Exam, Prisma, Subject, Teacher } from '@prisma/client';
import { ITEMS_PER_PAGE } from '@/lib/constants';

type ExamList = Exam & {
  lesson: {
    subject: Subject;
    teacher: Teacher;
    class: Class;
  };
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
    header: 'Date',
    accessor: 'date',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
];

const renderRow = (item: ExamList) => (
  <tr
    key={item.id}
    className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-maestroPurpleLight'
  >
    <td className='flex items-center p-4 gap-4 '>{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className='hidden md:table-cell'>
      {item.lesson.teacher.firstname + ' ' + item.lesson.teacher.lastname}
    </td>
    <td className='hidden md:table-cell'>
      {new Intl.DateTimeFormat('en-US').format(item.startTime)}
    </td>
    <td>
      <div className='flex items-center gap-2'>
        {role === 'admin' && (
          <>
            <FormModal table='exam' type='update' data={item} id={item.id} />
            <FormModal table='exam' type='delete' id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
export default async function ExamsListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // URL params conditions
  const query: Prisma.ExamWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'classId':
            {
              query.lesson = { classId: parseInt(value) };
            }
            break;
          case 'teacherId':
            {
              query.lesson = { teacherId: value };
            }
            break;
          case 'search':
            {
              query.lesson = {
                subject: {
                  name: {
                    contains: value,
                    mode: 'insensitive',
                  },
                },
              };
            }
            break;
          default:
            break;
        }
      }
    }
  }

  const [examsData, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { firstname: true, lastname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1),
    }),
    prisma.exam.count({
      where: query,
    }),
  ]);
  return (
    <section className='bg-white p-4 flex-1 rounded-md m-4 mt-0'>
      {/* Top Section */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Exams</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='size-8 flex items-center justify-center rounded-full bg-maestroYellow'>
              <Image src='/filter.png' alt='filter' width={14} height={14} />
            </button>
            <button className='size-8 flex items-center justify-center rounded-full bg-maestroYellow'>
              <Image src='/sort.png' alt='filter' width={14} height={14} />
            </button>
            {role === 'admin' && <FormModal table='exam' type='create' />}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={examsData} />
      {/* Pagination */}
      <Pagination page={currentPage} count={count} />
    </section>
  );
}
