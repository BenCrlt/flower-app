import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
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
  Row,
  SortingState,
  Table as TableInstance,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

const DEFAULT_PAGE_SIZE = 100;
const MOBILE_INITIAL_COUNT = 20;
const MOBILE_LOAD_MORE_COUNT = 20;

export interface MobileCardMeta {
  isExpanded: boolean;
  canExpand: boolean;
  onToggleExpand: () => void;
}

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
  mobileCardRenderer?: (
    row: TData,
    meta: MobileCardMeta,
  ) => React.ReactNode;
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
  mobileCardRenderer,
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [expandedRowIds, setExpandedRowIds] = useState<Record<string, boolean>>(
    {},
  );
  const [mobileVisibleCount, setMobileVisibleCount] = useState(
    MOBILE_INITIAL_COUNT,
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

  const sortedRows = table.getSortedRowModel().rows;
  const hasMoreOnMobile =
    isMobile && mobileVisibleCount < sortedRows.length;
  const displayRows = isMobile
    ? sortedRows.slice(0, mobileVisibleCount)
    : table.getRowModel().rows;

  useEffect(() => {
    setMobileVisibleCount(MOBILE_INITIAL_COUNT);
  }, [data, sorting, columnFilters, globalFilter]);

  useEffect(() => {
    if (!isMobile || !hasMoreOnMobile) {
      return;
    }

    const sentinel = loadMoreRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMobileVisibleCount((previous) =>
            Math.min(previous + MOBILE_LOAD_MORE_COUNT, sortedRows.length),
          );
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isMobile, hasMoreOnMobile, sortedRows.length]);

  const hasExpandableRows = Boolean(renderExpandedRow);
  const tableColSpan = columns.length + (hasExpandableRows ? 1 : 0);
  const handleToggleExpandedRow = (rowId: string) => {
    setExpandedRowIds((previous) => ({
      ...previous,
      [rowId]: !previous[rowId],
    }));
  };

  const renderMobileCardRow = (row: Row<TData>) => {
    const rowId = row.id;
    const rowCanExpand = hasExpandableRows
      ? isRowExpandable
        ? isRowExpandable(row.original)
        : true
      : false;
    const isExpanded = !!expandedRowIds[rowId];

    return (
      <div key={rowId} className="flex flex-col gap-2">
        <div
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
          {mobileCardRenderer?.(row.original, {
            isExpanded,
            canExpand: rowCanExpand,
            onToggleExpand: () => handleToggleExpandedRow(rowId),
          })}
        </div>
        {hasExpandableRows && isExpanded && rowCanExpand && (
          <div className="pl-1">{renderExpandedRow?.(row.original)}</div>
        )}
      </div>
    );
  };

  const renderTableRow = (row: Row<TData>) => {
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
  };

  const useMobileCards = isMobile && Boolean(mobileCardRenderer);

  const mobileInfiniteScrollFooter =
    isMobile && sortedRows.length > 0 ? (
      <div className="py-3 text-center text-xs text-muted-foreground">
        {hasMoreOnMobile ? (
          <div ref={loadMoreRef} className="h-4" aria-hidden />
        ) : (
          <span>
            {sortedRows.length} résultat{sortedRows.length > 1 ? "s" : ""}
          </span>
        )}
      </div>
    ) : null;

  return (
    <div>
      {actions && <div className="mb-4">{actions(table)}</div>}
      {useMobileCards ? (
        <div className="flex flex-col gap-3">
          {displayRows.length ? (
            displayRows.map((row) => renderMobileCardRow(row))
          ) : (
            <div className="rounded-md border bg-card px-4 py-6 text-sm text-muted-foreground">
              Pas de résultats.
            </div>
          )}
          {mobileInfiniteScrollFooter}
        </div>
      ) : (
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
              {displayRows.length ? (
                displayRows.map((row) => renderTableRow(row))
              ) : (
                <TableRow>
                  <TableCell colSpan={tableColSpan} className="h-15 text-left">
                    Pas de résultats.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {mobileInfiniteScrollFooter}
        </div>
      )}
      {!isMobile && (
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
      )}
    </div>
  );
}
