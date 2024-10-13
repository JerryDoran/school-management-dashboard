

import Announcements from '@/components/announcements';
import BigCalendar from '@/components/big-calendar';
import EventCalendar from '@/components/event-calander';

export default function StudentPage() {
  return (
    <section className='p-4 flex gap-4 flex-col xl:flex-row'>
      {/* Left */}
      <div className='w-full xl:w-2/3'>
        <div className='h-full bg-white rounded-md p-4'>
          <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>

      {/* Right */}

      <aside className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendar />
        <Announcements />
      </aside>
    </section>
  );
}
