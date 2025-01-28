import Announcements from '@/components/announcements';
import BigCalendar from '@/components/big-calendar';
import PerformanceChart from '@/components/performance-chart';
import Image from 'next/image';
import Link from 'next/link';

export default function SingleStudentPage() {
  return (
    <div className='flex flex-1 flex-col xl:flex-row p-4 gap-4'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3'>
        {/* Top */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* User Info Card */}
          <div className='bg-maestroSky py-6 px-4 rounded-md flex-1 flex gap-4'>
            <div className='w-1/3'>
              <Image
                src='https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt='teacher profile picture'
                width={144}
                height={144}
                className='md:size-32 size-28 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <h1 className='text-xl font-semibold'>Allie Anderson</h1>
              <p className='text-sm text-gray-500'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 2xl:w-2/5 lg:w-full flex items-center gap-2'>
                  <Image src='/phone.png' alt='phone' width={14} height={14} />
                  <span>(555) 123-4567</span>
                </div>
                <div className='w-full md:w-1/3 2xl:w-2/5 lg:w-full flex items-center gap-2'>
                  <Image
                    src='/blood.png'
                    alt='blood type'
                    width={14}
                    height={14}
                  />
                  <span>A+</span>
                </div>
                <div className='w-full md:w-1/3 2xl:w-2/5 lg:w-full flex items-center gap-2'>
                  <Image src='/date.png' alt='date' width={14} height={14} />
                  <span>January 2025</span>
                </div>
                <div className='w-full md:w-1/3 2xl:w-2/5 lg:w-full flex items-center gap-2'>
                  <Image src='/mail.png' alt='mail' width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Info Cards */}
          <div className='flex-1 flex gap-4 justify-between flex-wrap'>
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/singleAttendance.png'
                alt='attendance'
                width={24}
                height={24}
                className='size-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>90%</h1>
                <span className='text-sm text-gray-400'>Attendance</span>
              </div>
            </div>
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/singleBranch.png'
                alt='attendance'
                width={24}
                height={24}
                className='size-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>12th</h1>
                <span className='text-sm text-gray-400'>Grade</span>
              </div>
            </div>
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/singleLesson.png'
                alt='attendance'
                width={24}
                height={24}
                className='size-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>18</h1>
                <span className='text-sm text-gray-400'>Lessons</span>
              </div>
            </div>
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
              <Image
                src='/singleClass.png'
                alt='attendance'
                width={24}
                height={24}
                className='size-6'
              />
              <div className=''>
                <h1 className='text-xl font-semibold'>7A</h1>
                <span className='text-sm text-gray-400'>Class</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
          <h1 className='text-2xl font-semibold'>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <div className='bg-white rounded-md p-4'>
          <h1 className='text-xl font-semibold'>Shortcuts</h1>
          <div className='mt-4 flex flex-wrap gap-4 text-xs text-gray-500'>
            <Link
              href={`/list/lessons?classId=${2}`}
              className='p-3 rounded-md bg-maestroSkyLight'
            >
              Student&apos;s Lessons
            </Link>
            <Link
              href={`/list/teachers?classId=${2}`}
              className='p-3 rounded-md bg-maestroPurpleLight'
            >
              Student&apos;s Teachers
            </Link>
            <Link
              href={`/list/results?classId=${2}`}
              className='p-3 rounded-md bg-maestroYellowLight'
            >
              Student&apos;s Results
            </Link>
            <Link
              href={`/list/exams?classId=${2}`}
              className='p-3 rounded-md bg-pink-50'
            >
              Student&apos;s Exams
            </Link>
            <Link
              href={`/list/assignments?classId=${2}`}
              className='p-3 rounded-md bg-indigo-50'
            >
              Student&apos;s Assignments
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
}
