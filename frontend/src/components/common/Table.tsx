import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function Table<T extends { id: string }>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl glass border border-white/10">
      <table className="min-w-full divide-y divide-white/10">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((row) => (
            <tr key={row.id} onClick={() => onRowClick?.(row)} className="hover:bg-white/5 transition-colors cursor-pointer">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-10 text-center text-sm text-gray-500">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
