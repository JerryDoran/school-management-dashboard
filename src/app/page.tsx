import Navbar from '@/components/navbar';
import PerformanceChart from '@/components/performance-chart';
import AttendanceChart from '@/components/attendance-chart';
import FinanceChart from '@/components/finance-chart';
import Announcements from '@/components/announcements';
import UserCard from '@/components/user-card';
import Link from 'next/link';
import Image from 'next/image';

const QuickLink = ({ href, title }: { href: string; title: string }) => (
  <Link 
    href={href}
    className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex items-center justify-between"
  >
    <span className="text-gray-700">{title}</span>
    <span className="text-gray-400">→</span>
  </Link>
);

const Homepage = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />

      <main className='container mx-auto px-4 py-8'>
        {/* Dashboard Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>School Dashboard</h1>
          <p className='text-gray-600'>
            Welcome to your school management system
          </p>
        </div>

        {/* Admin Dashboard Link */}
        <Link
          href="/admin"
          className="block mb-8 p-6 bg-gradient-to-r from-maestroPurple to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Admin Dashboard</h2>
              <p className="text-purple-100">Access complete school management controls</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors">
              <Image
                src="/setting.png"
                alt="Admin"
                width={24}
                height={24}
                className="brightness-0 invert"
              />
            </div>
          </div>
        </Link>

        {/* Quick Links */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <QuickLink href="/list/teachers" title="Teachers" />
          <QuickLink href="/list/students" title="Students" />
          <QuickLink href="/list/classes" title="Classes" />
          <QuickLink href="/list/subjects" title="Subjects" />
          <QuickLink href="/list/assignments" title="Assignments" />
          <QuickLink href="/list/exams" title="Exams" />
          <QuickLink href="/list/results" title="Results" />
          <QuickLink href="/list/parents" title="Parents" />
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <UserCard
            type='student'
            title='Total Students'
            value='1,234'
            trend='+5%'
            icon='👥'
          />
          <UserCard
            type='teacher'
            title='Total Teachers'
            value='89'
            trend='+2%'
            icon='👨‍🏫'
          />
          <UserCard
            type='staff'
            title='Total Staff'
            value='104'
            trend='+12%'
            icon='💰'
          />
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4'>Student Performance</h2>
            <PerformanceChart />
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4'>Attendance Overview</h2>
            <AttendanceChart />
          </div>
        </div>

        {/* Bottom Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='md:col-span-2 bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4'>Financial Overview</h2>
            <FinanceChart />
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <div className="flex justify-between items-center mb-4">
              <h2 className='text-xl font-semibold'>Recent Announcements</h2>
              <Link href="/list/announcements" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
            <Announcements />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
