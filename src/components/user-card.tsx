import Image from 'next/image';

type UserCardProps = {
  type: string;
  title?: string;
  value?: string;
  trend?: string;
  icon?: string;
};

export default function UserCard({
  type,
  title,
  value,
  trend,
  icon,
}: UserCardProps) {
  return (
    <div className='rounded-2xl odd:bg-maestroPurple even:bg-maestroYellow p-4 flex-1 min-w-[130px]'>
      <div className='flex justify-between items-center'>
        <span className='text-[10px] bg-white px-2 py-1 rounded-full text-green-600'>
          2024/25
        </span>
        <Image src='/more.png' alt='' width={20} height={20} />
      </div>
      <h1 className='text-2xl font-semibold my-4'>{value}</h1>
      {type === 'staff' ? (
        <h2 className='capitalize text-sm font-medium text-gray-500'>{type}</h2>
      ) : (
        <h2 className='capitalize text-sm font-medium text-gray-500'>
          {type}s
        </h2>
      )}
    </div>
  );
}
