import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table as TableInstance,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { Button } from "../ui/button";

const DEFAULT_PAGE_SIZE = 100;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Nombre de lignes par page (pagination client TanStack Table). */
  pageSize?: number;
  /** Classes sur `<table>` (ex. `table-fixed` pour largeurs stables + ellipsis). */
  tableClassName?: string;
  actions?: (table: TableInstance<TData>) => React.ReactNode;
  onRowClick?: (row: TData) => void;
  getRowId?: (row: TData) => string;
  isRowExpandable?: (row: TData) => boolean;
  renderExpandedRow?: (row: TData) => React.ReactNode;
  expandOnRowClick?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = DEFAULT_PAGE_SIZE,
  tableClassName,
  actions,
  onRowClick,
  getRowId,
  isRowExpandable,
  renderExpandedRow,
  expandOnRowClick = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [expandedRowIds, setExpandedRowIds] = useState<Record<string, boolean>>(
    {},
  );

  const table = useReactTable({
    data,
    columns,
    getRowId,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const hasExpandableRows = Boolean(renderExpandedRow);
  const tableColSpan = columns.length + (hasExpandableRows ? 1 : 0);
  const handleToggleExpandedRow = (rowId: string) => {
    setExpandedRowIds((previous) => ({
      ...previous,
      [rowId]: !previous[rowId],
    }));
  };

  return (
    <div>
      {actions && <div className="mb-4">{actions(table)}</div>}
      <div className="w-full min-w-0 overflow-x-auto rounded-md border bg-card">
        <Table className={tableClassName}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {hasExpandableRows && <TableHead className="w-10" />}
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "border-r last:border-r-0",
                      (header.column.columnDef.meta as { className?: string })
                        ?.className,
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const rowId = row.id;
                const rowCanExpand = hasExpandableRows
                  ? isRowExpandable
                    ? isRowExpandable(row.original)
                    : true
                  : false;
                const isExpanded = !!expandedRowIds[rowId];

                return (
                  <React.Fragment key={rowId}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => {
                        if (expandOnRowClick && rowCanExpand) {
                          handleToggleExpandedRow(rowId);
                        }
                        onRowClick?.(row.original);
                      }}
                      className={
                        onRowClick || (expandOnRowClick && rowCanExpand)
                          ? "cursor-pointer"
                          : undefined
                      }
                    >
                      {hasExpandableRows && (
                        <TableCell className="w-10">
                          {rowCanExpand ? (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-7"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleToggleExpandedRow(rowId);
                              }}
                              aria-label={
                                isExpanded
                                  ? "Masquer les détails"
                                  : "Afficher les détails"
                              }
                            >
                              {isExpanded ? (
                                <ChevronDown className="size-4" />
                              ) : (
                                <ChevronRight className="size-4" />
                              )}
                            </Button>
                          ) : null}
                        </TableCell>
                      )}
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "border-r last:border-r-0",
                            (cell.column.columnDef.meta as { className?: string })
                              ?.className,
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    {hasExpandableRows && isExpanded && rowCanExpand && (
                      <TableRow>
                        <TableCell colSpan={tableColSpan} className="bg-muted/20">
                          {renderExpandedRow?.(row.original)}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={tableColSpan} className="h-15 text-left">
                  Pas de résultats.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
