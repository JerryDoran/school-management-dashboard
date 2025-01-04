'use client'; // This is a client component 👈🏽'

import { ITEMS_PER_PAGE } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export default function Pagination({
  page,
  count,
}: {
  page: number;
  count: number;
}) {
  const router = useRouter();

  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count;

  function changePage(newPage: number) {
    const params = new URLSearchParams(window.location.search);
    params.set('page', newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  }
  return (
    <div className='p-4 flex justify-between text-gray-500'>
      <button
        disabled={!hasPrev}
        className='py-2 px-4 rounded-md bg-slate-200 font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={() => changePage(page - 1)}
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
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        disabled={!hasNext}
        className='py-2 px-4 rounded-md bg-slate-200 font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
