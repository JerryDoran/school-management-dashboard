export default function Announcements() {
  return (
    <div className='bg-white p-4 rounded-md'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Announcements</h1>
        <span className='text-gray-400 text-xs cursor-pointer hover:underline'>
          View all
        </span>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='bg-maestroSkyLight rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-medium'>Lorem ipsum dolor sit.</h2>
            <span className='text-[11px] text-gray-400 bg-white rounded-md px-2 py-1'>
              2024-10-29
            </span>
          </div>
          <p className='text-sm text-gray-400 mt-2'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perferendis atque quasi minima!
          </p>
        </div>
        <div className='bg-maestroPurpleLight rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-medium'>Lorem ipsum dolor sit.</h2>
            <span className='text-[11px] text-gray-400 bg-white rounded-md px-2 py-1'>
              2024-11-15
            </span>
          </div>
          <p className='text-sm text-gray-400 mt-2'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perferendis atque quasi minima!
          </p>
        </div>
        <div className='bg-maestroYellowLight rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-medium'>Lorem ipsum dolor sit.</h2>
            <span className='text-[11px] text-gray-400 bg-white rounded-md px-2 py-1'>
              2024-12-15
            </span>
          </div>
          <p className='text-sm text-gray-400 mt-2'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perferendis atque quasi minima!
          </p>
        </div>
      </div>
    </div>
  );
}
