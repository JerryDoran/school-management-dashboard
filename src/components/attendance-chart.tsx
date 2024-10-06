'use client';

import Image from 'next/image';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Mon',
    present: 95,
    absent: 56,
  },
  {
    name: 'Tue',
    present: 90,
    absent: 65,
  },
  {
    name: 'Wed',
    present: 94,
    absent: 70,
  },
  {
    name: 'Thur',
    present: 92,
    absent: 64,
  },
  {
    name: 'Fri',
    present: 95,
    absent: 73,
  },
];

export default function AttendanceChart() {
  return (
    <div className='bg-white rounded-lg p-4 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Attendance</h1>
        <Image src='/moreDark.png' alt='' width={20} height={20} />
      </div>
      <div className='relative w-full h-[90%]'>
        <ResponsiveContainer>
          <BarChart width={500} height={300} data={data} barSize={20}>
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#ddd'
            />
            <XAxis
              dataKey='name'
              axisLine={false}
              tick={{ fill: '#d1d5db' }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: '#d1d5db' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '10px',
                borderColor: 'lightgray',
                fontSize: '12px',
                opacity: '90%',
              }}
            />
            <Legend
              align='left'
              verticalAlign='top'
              wrapperStyle={{ paddingTop: '20px', paddingBottom: '30px' }}
            />
            <Bar
              dataKey='present'
              fill='#fae27c'
              legendType='circle'
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey='absent'
              fill='#c3ebfa'
              legendType='circle'
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
