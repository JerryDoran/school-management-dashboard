import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '@/components/menu';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maestro School Management Dashboard',
  description: 'Next.js School Management System',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-screen flex'>
      {/* Sidebar */}
      <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]'>
        <Link href='/' className='flex items-center gap-2 lg:justify-start p-4'>
          <Image src='/logo.png' width={32} height={32} alt='logo' />
          <span className='hidden lg:block'>Maestro</span>
        </Link>
        <Menu />
      </div>
      {/* Navbar */}
      <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll'>
        <Navbar />
        {children}
      </div>
    </div>
  );
}
