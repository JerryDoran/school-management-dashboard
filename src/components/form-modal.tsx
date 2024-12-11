'use client';

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
  const size = type === 'create' ? 'size-8' : 'size-7';
  const backgroundColor =
    type === 'create'
      ? 'bg-maestroYellow'
      : type === 'update'
      ? 'bg-maestroSky'
      : 'bg-maestroPurple';
  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${backgroundColor}`}
      >
        <Image src={`/${type}.png`} alt='button' width={16} height={16} />
      </button>
    </>
  );
}
