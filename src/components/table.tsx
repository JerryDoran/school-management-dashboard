type TableProps = {
  columns: {
    header: string;
    accessor: string;
    className?: string;
  }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
};


export default function Table({ columns, renderRow, data }: TableProps) {
  return (
    <table className='w-full mt-4'>
      <thead className=''>
        <tr className=' text-gray-500 text-sm text-left'>
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className=''>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
}
