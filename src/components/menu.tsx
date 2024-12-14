'use client';

import { menuItems } from '@/data/siteData';
import { role } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Menu() {
  const pathname = usePathname();

  const shouldInvertIcon = (icon: string, isActive: boolean) => {
    // Don't invert the results icon when active
    if (icon === '/result.png') {
      return false;
    }
    return isActive;
  };

  return (
    <nav className='mt-4 text-sm p-4'>
      {menuItems.map((item) => (
        <div className='flex flex-col gap-2 mb-4' key={item.title}>
          <span className='hidden lg:block text-gray-400 font-light my-2'>
            {item.title}
          </span>
          {item.items.map((i) => {
            if (i.visible.includes(role)) {
              const isActive = pathname === i.href;
              return (
                <Link
                  href={i.href}
                  key={i.label}
                  className={`flex items-center justify-center lg:justify-start gap-4 py-2 px-2 rounded-lg w-full transition-all duration-200 ${
                    isActive
                      ? 'bg-maestroPurple text-white font-medium'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Image 
                    src={i.icon} 
                    alt={i.label} 
                    width={20} 
                    height={20} 
                    className={shouldInvertIcon(i.icon, isActive) ? 'brightness-0 invert' : ''}
                  />
                  <span className='hidden lg:block'>{i.label}</span>
                  {isActive && (
                    <div className="w-1 h-full absolute right-0 bg-maestroPurple rounded-l-md" />
                  )}
                </Link>
              );
            }
          })}
        </div>
      ))}
    </nav>
  );
}
