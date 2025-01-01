import { ITEMS_PER_PAGE } from '@/lib/constants';

export default function Pagination({
  page,
  count,
}: {
  page: number;
  count: number;
}) {
  return (
    <div className='p-4 flex justify-between text-gray-500'>
      <button
        disabled
        className='py-2 px-4 rounded-md bg-slate-200 font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Prev
      </button>
      <div className='flex items-center gap-2 text-sm'>
        {Array.from({ length: Math.ceil(count / ITEMS_PER_PAGE) }, (_, i) => {
          const pageIndex = i + 1;
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm ${
                pageIndex === page ? 'bg-maestroSky text-white' : 'bg-slate-200'
              }`}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        disabled
        className='py-2 px-4 rounded-md bg-slate-200 font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Next
      </button>
    </div>
  );
}
