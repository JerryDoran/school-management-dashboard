import AttendanceChart from '@/components/attendance-chart';
import CountChart from '@/components/count-chart';
import FinanceChart from '@/components/finance-chart';
import UserCard from '@/components/user-card';

export default function AdminPage() {
  return (
    <div className='flex p-4 gap-4 flex-col md:flex-row'>
      {/* Left */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        <div className='flex gap-4 justify-between flex-wrap'>
          <UserCard type='student' />
          <UserCard type='teacher' />
          <UserCard type='parent' />
          <UserCard type='staff' />
        </div>
        {/* Middle Charts */}
        <div className='flex gap-4 flex-col lg:flex-row'>
          {/* Count Chart */}
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountChart />
          </div>
          {/* Attendance Chart */}
          <div className='w-full lg:w-2/3 h-[450px]'>
            <AttendanceChart />
          </div>
        </div>
        {/* Bottom Charts */}
        <div className='w-full h-[500px]'>
          <FinanceChart />
        </div>
      </div>
      {/* Right */}
      <div className='w-full lg:w-1/3'>R</div>
    </div>
  );
}
