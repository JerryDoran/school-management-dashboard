'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TableSearch() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set('search', value);
    router.push(`${window.location.pathname}?${params}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full md:w-auto flex items-center text-sm gap-3 bg-white p-2 rounded-full ring-[1.5px] ring-gray-200'
    >
      <Image
        src='/search.png'
        alt='search'
        width={14}
        height={14}
        className='object-contain'
      />
      <input
        placeholder='Search...'
        className='outline-none w-[200px] bg-transparent'
      />
    </form>
  );
}
