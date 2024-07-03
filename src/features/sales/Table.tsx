import React from 'react'
import {useAppSelector} from "../../store/hooks.ts";
import {SaleType, selectSales} from "./salesSlice.ts";
import dayjs from "dayjs";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table'
import {
  formatMoney
} from "../../utils/format.ts";

const columnHelper = createColumnHelper<SaleType>()

const columns = [
  columnHelper.accessor('weekEnding', {
    header: () =>'Week Ending',
    cell: info => dayjs(info.getValue()).format('MM-DD-YY'),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('retailSales', {
    header: () => 'Retail Sales',
    // @ts-ignore
    cell: info => formatMoney(info.renderValue()),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('wholesaleSales', {
    header: () => 'Wholesale Sales',
    // @ts-ignore
    cell: info => formatMoney(info.renderValue()),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('unitsSold', {
    header: () => 'Units Sold',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('retailerMargin', {
    header: () => 'Retailer Margin',
    // @ts-ignore
    cell: info => formatMoney(info.renderValue()),
    footer: info => info.column.id,
  }),
]

const Table = () => {
  const sales = useAppSelector(selectSales)
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data: sales || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting,
    state: {
      sorting
    }
  })

  return (
    <div className='w-max bg-white'>
      <table
        className={'min-w-full divide-y divide-gray-200'}
      >
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  scope="col"
                  className="px-3 py-3 text-xs font-bold text-left  uppercase "
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '' + ''
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === 'asc'
                            ? 'Sort ascending'
                            : header.column.getNextSortingOrder() === 'desc'
                              ? 'Sort descending'
                              : 'Clear sort'
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              )
            })}
          </tr>
        ))}
        </thead>
        <tbody>
        {table
          .getRowModel()
          .rows
          .map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id} className={'text-gray-400'}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>

      </table>
    </div>
  );
};

export default Table;