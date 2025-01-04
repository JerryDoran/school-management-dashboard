'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
// import StudentForm from './forms/student-form';
// import TeacherForm from './forms/teacher-form';

const TeacherForm = dynamic(() => import('./forms/teacher-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const StudentForm = dynamic(() => import('./forms/student-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const ParentForm = dynamic(() => import('./forms/student-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const SubjectForm = dynamic(() => import('./forms/subject-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const ClassForm = dynamic(() => import('./forms/class-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const LessonForm = dynamic(() => import('./forms/lesson-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const ExamForm = dynamic(() => import('./forms/exam-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const AssignmentForm = dynamic(() => import('./forms/assignment-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const ResultForm = dynamic(() => import('./forms/result-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const AttendanceForm = dynamic(() => import('./forms/attendance-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const EventForm = dynamic(() => import('./forms/event-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});
const AnnouncementForm = dynamic(() => import('./forms/announcement-form'), {
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});

const forms: {
  [key: string]: (type: 'create' | 'update', data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
  subject: (type, data) => <SubjectForm type={type} data={data} />,
  class: (type, data) => <ClassForm type={type} data={data} />,
  lesson: (type, data) => <LessonForm type={type} data={data} />,
  exam: (type, data) => <ExamForm type={type} data={data} />,
  assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  result: (type, data) => <ResultForm type={type} data={data} />,
  attendance: (type, data) => <AttendanceForm type={type} data={data} />,
  event: (type, data) => <EventForm type={type} data={data} />,
  announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
};

type FormModalProps = {
  table:
    | 'teacher'
    | 'student'
    | 'parent'
    | 'subject'
    | 'class'
    | 'lesson'
    | 'exam'
    | 'assignment'
    | 'result'
    | 'attendance'
    | 'event'
    | 'announcement';
  type: 'create' | 'update' | 'delete';
  data?: any;
  id?: number | string;
};

export default function FormModal({ table, type, data, id }: FormModalProps) {
  const [open, setOpen] = useState(false);
  const size = type === 'create' ? 'size-8' : 'size-7';
  const backgroundColor =
    type === 'create'
      ? 'bg-maestroYellow'
      : type === 'update'
      ? 'bg-maestroSky'
      : 'bg-maestroPurple';

  function Form() {
    return type === 'delete' && id ? (
      <form action='' className='p-4 flex flex-col gap-4 '>
        <span className='text-center font-medium'>
          Are you sure you want to delete this {table}? These changes cannot be
          reversed.
        </span>
        <button className='bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center'>
          Delete
        </button>
      </form>
    ) : type === 'create' || type === 'update' ? (
      forms[table](type, data)
    ) : (
      'Form not found!'
    );
  }

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${backgroundColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt='button' width={16} height={16} />
      </button>
      {open && (
        <div className='w-screen h-screen fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-md relative w-[90%] sm:w-[70%] lg:w-[60%] xl:w-[50%] max-lg:h-[90%] overflow-y-auto'>
            <Form />
            <div>
              <Image
                src='/close.png'
                alt='close'
                width={12}
                height={12}
                className='absolute right-4 top-4 cursor-pointer'
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
