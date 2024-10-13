import { menuItems } from '@/data/siteData';
import { role } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default function Menu() {
  return (
    <nav className='mt-4 text-sm p-4'>
      {menuItems.map((item) => (
        <div className='flex flex-col gap-2 mb-4' key={item.title}>
          <span className='hidden lg:block text-gray-400 font-light my-2'>
            {item.title}
          </span>
          {item.items.map((i) => {
            if (i.visible.includes(role)) {
              return (
                <Link
                  href={i.href}
                  key={i.label}
                  className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 transition hover:bg-gray-100 px-2 rounded-lg w-full'
                >
                  <Image src={i.icon} alt={i.label} width={20} height={20} />
                  <span className='hidden lg:block'>{i.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </nav>
  );
}
