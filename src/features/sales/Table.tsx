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
    header: () =>'WEEK ENDING',
    cell: info => dayjs(info.getValue()).format('MM-DD-YY'),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('retailSales', {
    header: () => 'RETAIL SALES',
    // @ts-ignore
    cell: info => formatMoney(info.renderValue()),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('wholesaleSales', {
    header: () => 'WHOLESALE SALES',
    // @ts-ignore
    cell: info => formatMoney(info.renderValue()),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('unitsSold', {
    header: () => 'UNITS SOLD',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('retailerMargin', {
    header: () => 'RETAILER MARGIN',
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
    <div className='w-max'>
      <table>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
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
          .rows.slice(0, 10)
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