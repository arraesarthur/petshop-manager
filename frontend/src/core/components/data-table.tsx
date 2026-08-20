import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type OnChangeFn
} from '@tanstack/react-table'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { usePagination } from '../hooks/use-pagination'
import { rowsPerPageOptions } from '../utils/rows-per-page'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  rowCount: number
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
  onRowClick?: (row: TData) => void
  maxCellLength?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  pagination,
  onPaginationChange,
  onRowClick,
  maxCellLength = 30
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    rowCount,
    state: {
      pagination
    },
    onPaginationChange,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel()
  })

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: table.getState().pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
    paginationItemsToDisplay: 5
  })

  const TruncatedCell = ({ cell }: { cell: any }) => {
    const rawValue = cell.getValue()
    const content = flexRender(cell.column.columnDef.cell, cell.getContext())

    if (
      cell.column.id === 'actions' ||
      (typeof rawValue !== 'string' && typeof rawValue !== 'number')
    ) {
      return <>{content}</>
    }

    const textString = String(rawValue)

    if (textString.length <= maxCellLength) {
      return <span>{textString}</span>
    }

    const truncatedText = textString.slice(0, maxCellLength) + '...'

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className='underline decoration-dotted decoration-muted-foreground/30 cursor-default focus:outline-none select-none'>
            {truncatedText}
          </span>
        </TooltipTrigger>
        <TooltipContent className='bg-popover text-popover-foreground shadow-md border border-pink-100/60 text-xs'>
          <p className='break-words font-normal'>{textString}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className='w-full space-y-4'>
        <div className='block md:hidden space-y-3 px-2'>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <div
                key={row.id}
                onClick={() => onRowClick && onRowClick(row.original)}
                className={`p-4 rounded-xl border border-pink-100/60 bg-card text-card-foreground shadow-xs space-y-2.5 transition-colors ${
                  onRowClick ? 'cursor-pointer active:bg-pink-50/10' : ''
                }`}
              >
                {row.getVisibleCells().map(cell => {
                  const isActions = cell.column.id === 'actions'
                  const headerLabel = cell.column.columnDef.header

                  return (
                    <div
                      key={cell.id}
                      className={`flex ${isActions ? 'justify-end pt-2 border-t border-pink-50/40' : 'flex-col gap-0.5'}`}
                      onClick={e => {
                        if (isActions) e.stopPropagation()
                      }}
                    >
                      {!isActions && (
                        <span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80'>
                          {typeof headerLabel === 'string'
                            ? headerLabel
                            : cell.column.id}
                        </span>
                      )}
                      <div className='text-sm text-foreground break-all'>
                        <TruncatedCell cell={cell} />
                      </div>
                    </div>
                  )
                })}
              </div>
            ))
          ) : (
            <div className='p-8 text-center text-sm text-muted-foreground border border-dashed border-pink-100/60 rounded-xl'>
              Nenhum dado encontrado.
            </div>
          )}
        </div>

        <div className='hidden md:block relative w-full overflow-auto rounded-xl border border-pink-100/40'>
          <Table>
            <TableHeader className='bg-pink-50/20 font-medium border-b border-pink-100/40'>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className='h-11 text-foreground/80 font-semibold'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={`transition-colors duration-150 border-pink-50/60 hover:bg-pink-50/10 ${
                      onRowClick ? 'cursor-pointer select-none' : ''
                    }`}
                    onClick={() => onRowClick && onRowClick(row.original)}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className='py-3 alignment-baseline max-w-[200px]'
                        onClick={e => {
                          if (cell.column.id === 'actions') {
                            e.stopPropagation()
                          }
                        }}
                      >
                        <TruncatedCell cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-32 text-center text-muted-foreground'
                  >
                    Nenhum dado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-between gap-4 max-sm:flex-col p-4 border border-pink-100/60 md:border-t rounded-xl bg-yellow-50/10'>
          <p
            className='text-muted-foreground flex-1 text-sm whitespace-nowrap order-2 sm:order-1'
            aria-live='polite'
          >
            Página{' '}
            <span className='text-foreground font-semibold'>
              {table.getState().pagination.pageIndex + 1}
            </span>{' '}
            de{' '}
            <span className='text-foreground font-semibold'>
              {table.getPageCount() || 1}
            </span>
          </p>

          <div className='grow flex justify-center order-1 sm:order-2 w-full sm:w-auto'>
            <Pagination>
              <PaginationContent className='gap-1 flex-wrap justify-center'>
                <PaginationItem>
                  <Button
                    size='icon'
                    variant='outline'
                    className='h-8 w-8 border-pink-100 text-pink-500 hover:bg-pink-50/50'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <ChevronLeftIcon className='h-4 w-4' />
                  </Button>
                </PaginationItem>

                {showLeftEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {pages.map(page => {
                  const isActive =
                    page === table.getState().pagination.pageIndex + 1

                  return (
                    <PaginationItem key={page}>
                      <Button
                        size='icon'
                        variant={isActive ? 'outline' : 'ghost'}
                        className={`h-8 w-8 font-semibold text-sm transition-all ${
                          isActive
                            ? 'bg-yellow-300 text-yellow-900 border-yellow-400 hover:bg-yellow-400 hover:text-yellow-950 shadow-xs'
                            : 'hover:bg-pink-50/60'
                        }`}
                        onClick={() => table.setPageIndex(page - 1)}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {page}
                      </Button>
                    </PaginationItem>
                  )
                })}

                {showRightEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <Button
                    size='icon'
                    variant='outline'
                    className='h-8 w-8 border-pink-100 text-pink-500 hover:bg-pink-50/50'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <ChevronRightIcon className='h-4 w-4' />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div className='flex flex-1 justify-end items-center gap-2 order-3 w-full sm:w-auto justify-center sm:justify-end'>
            <span className='text-xs text-muted-foreground whitespace-nowrap hidden md:inline'>
              Linhas por pág.
            </span>
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={value => table.setPageSize(Number(value))}
            >
              <SelectTrigger
                className='w-[80px] h-8 bg-background border-pink-100/80 focus:ring-pink-400'
                aria-label='Resultados por página'
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='p-1' align='end'>
                {rowsPerPageOptions.map(pageSize => (
                  <SelectItem
                    key={pageSize}
                    value={pageSize.toString()}
                    className='text-sm'
                  >
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
