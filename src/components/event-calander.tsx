'use client';

import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Image from 'next/image';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor',
    time: '12:00 PM - 2:00 PM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default function EventCalendar() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className='bg-white p-4 rounded'>
      <Calendar onChange={onChange} value={value} />
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold my-4'>Events</h1>
        <Image
          src='/moreDark.png'
          alt='elipse'
          width={20}
          height={20}
          className='cursor-pointer size-4'
        />
      </div>
      <div className='flex flex-col gap-4'>
        {events.map((event) => (
          <div
            className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-maestroSky even:border-t-maestroPurple'
            key={event.id}
          >
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold text-gray-600'>{event.title}</h2>
              <span className='text-gray-400 text-[11px]'>{event.time}</span>
            </div>
            <p className='text-sm mt-2 text-gray-400'>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
