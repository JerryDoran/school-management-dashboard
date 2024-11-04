import Image from 'next/image';

export default function TableSearch() {
  return (
    <div className='w-full md:w-auto flex items-center text-sm gap-3 bg-white p-2 rounded-full ring-[1.5px] ring-gray-200'>
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
    </div>
  );
}
