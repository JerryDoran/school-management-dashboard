'use client';

import { useState } from 'react';
import Image from 'next/image';

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
  id?: number;
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
      <form action='' className='p-4 flex flex-col gap-4'>
        <span className='text-center font-medium'>
          Are you sure you want to delete this {table}? These changes cannot be
          reversed.
        </span>
        <button className='bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center'>
          Delete
        </button>
      </form>
    ) : (
      'create or update'
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
        <div className=' w-screen h-screen fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded-md relative w-[90%] sm:w-[60%] lg:w-[40%]'>
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
