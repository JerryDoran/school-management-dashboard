'use client';

import Image from 'next/image';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    income: 4000,
    expense: 2400,
  },
  {
    name: 'Feb',
    income: 3000,
    expense: 1398,
  },
  {
    name: 'Mar',
    income: 2000,
    expense: 9800,
  },
  {
    name: 'Apr',
    income: 2780,
    expense: 3908,
  },
  {
    name: 'May',
    income: 1890,
    expense: 4800,
  },
  {
    name: 'Jun',
    income: 1390,
    expense: 3800,
  },
  {
    name: 'Jul',
    income: 9590,
    expense: 4300,
  },
  {
    name: 'Aug',
    income: 3490,
    expense: 8500,
  },
  {
    name: 'Sep',
    income: 3490,
    expense: 7300,
  },
  {
    name: 'Oct',
    income: 9490,
    expense: 4300,
  },
  {
    name: 'Nov',
    income: 6490,
    expense: 4300,
  },
  {
    name: 'Dec',
    income: 3490,
    expense: 8300,
  },
];

export default function FinanceChart() {
  return (
    <div className='bg-white rounded-lg p-4 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Finances</h1>
        <Image
          src='/moreDark.png'
          alt=''
          width={20}
          height={20}
          className='cursor-pointer'
        />
      </div>
      <ResponsiveContainer width='100%' height='90%'>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#ddd' />
          <XAxis
            dataKey='name'
            axisLine={false}
            tick={{ fill: '#d1d5db', fontSize: 14 }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: '#d1d5db', fontSize: 14 }}
            tickLine={false}
            tickMargin={10}
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
            align='center'
            verticalAlign='top'
            wrapperStyle={{
              paddingTop: '10px',
              paddingBottom: '30px',
              fontSize: 14,
            }}
          />
          <Line
            type='monotone'
            dataKey='income'
            stroke='#87cde7'
            strokeWidth={3}
          />
          <Line
            type='monotone'
            dataKey='expense'
            stroke='#b6b5ed'
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
