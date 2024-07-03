import {useAppSelector} from "../../store/hooks.ts";
import {SaleType, selectSales} from "./salesSlice.ts";
import dayjs from "dayjs";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
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
    cell: info => formatMoney(info.renderValue()),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('wholesaleSales', {
    header: () => 'WHOLESALE SALES',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('unitsSold', {
    header: () => 'UNITS SOLD',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('retailerMargin', {
    header: () => 'RETAILER MARGIN',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
]

const Table = () => {
  const sales = useAppSelector(selectSales)

  const table = useReactTable({
    data: sales || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='w-max'>
      <table>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>

      </table>
    </div>
  );
};

export default Table;