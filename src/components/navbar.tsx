import Image from 'next/image';

export default function Navbar() {
  return (
    <header className='flex items-center justify-between p-4'>
      {/* Searchbar */}
      <div className='hidden md:flex items-center text-sm gap-3 bg-white p-2 rounded-full ring-[1.5px] ring-gray-200'>
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
      {/* Icons & User */}
      <nav className='flex items-center gap-6 justify-end w-full'>
        <div className='bg-white rounded-full size-7 flex items-center justify-center cursor-pointer'>
          <Image src='/message.png' alt='message' width={20} height={20} />
        </div>
        <div className='relative bg-white rounded-full size-7 flex items-center justify-center cursor-pointer'>
          <Image src='/announcement.png' alt='message' width={20} height={20} />
          <div className='absolute -top-1.5 -right-1.5 size-4 text-xs flex items-center justify-center bg-purple-500 text-white rounded-full'>
            1
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-xs leading-3 font-medium'>John Doe</span>
          <span className='text-[10px] text-gray-500 text-right'>admin</span>
        </div>
        <Image
          src='/avatar.png'
          alt='user profile picture'
          width={36}
          height={36}
          className='rounded-full'
        />
      </nav>
    </header>
  );
}
