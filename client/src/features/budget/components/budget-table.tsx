import { DataTable } from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { LineTypeEnum } from "@/generated/graphql";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useDeleteBudgetLineMutation } from "../hooks/useDeleteBudgetLineMutation";
import { useGetBudgetCategoriesQuery } from "../hooks/useGetBudgetCategoriesQuery";
import { useGetBudgetLinesQuery } from "../hooks/useGetBudgetLinesQuery";
import { getRealCostForBudgetLine, isUnplannedLine } from "../utils";
import { BudgetMobileCard } from "./budget-mobile-card";
import { BudgetOverview } from "./budget-overview";
import { BudgetTableFiltersAndActions } from "./budget-table-actions";
import { BudgetTableRow, getColumns } from "./columns";
import { EditBudgetLineSheet } from "./edit-budget-line-sheet";
import { Coins, Percent, PiggyBank } from "lucide-react";

export function BudgetTable() {
  const { edition } = useEdition();
  const [lineType, setLineType] = useState<LineTypeEnum>(LineTypeEnum.Income);
  const [selectedRow, setSelectedRow] = useState<BudgetTableRow | null>(null);
  const [showGapInPercent, setShowGapInPercent] = useState<boolean>(true);
  const [onlyUnplanned, setOnlyUnplanned] = useState(false);

  const { data } = useGetBudgetLinesQuery({
    variables: {
      editionId: edition.id,
      budgetLineType: lineType,
    },
  });

  const { data: categoriesData } = useGetBudgetCategoriesQuery();

  const { mutate: deleteBudgetLine } = useDeleteBudgetLineMutation({
    onSuccess: () => {
      toast.success("Ligne budgétaire supprimée avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression de la ligne budgétaire", {
        description: error.message,
      });
    },
  });

  const rows = useMemo<BudgetTableRow[]>(
    () =>
      data?.budgetLines.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description ?? "",
        estimatedUnitPrice: Number(item.estimatedUnitPrice),
        estimatedQuantity: item.estimatedQuantity,
        categoryName: item.category?.name ?? "",
        categoryColor: item.category?.color ?? "",
        budgetCategoryId: item.category?.id ?? 0,
        realCost: getRealCostForBudgetLine(item),
        helloAssoProductId: item.helloAssoProductId ?? null,
        lineType: item.lineType,
        isFreePrice: item.isFreePrice,
        salesCount: item.salesCount ?? null,
      })) || [],
    [data],
  );
  const unplannedRows = useMemo(() => rows.filter(isUnplannedLine), [rows]);
  const tableRows = useMemo(
    () => (onlyUnplanned ? unplannedRows : rows),
    [onlyUnplanned, rows, unplannedRows],
  );

  const handleDeleteLine = (id: number) => deleteBudgetLine({ id });

  const columns = getColumns({
    onDelete: handleDeleteLine,
    allCategories: categoriesData?.budgetCategories,
    showGapInPercent,
    onToggleGapInPercent: () => setShowGapInPercent((prev) => !prev),
  });

  return (
    <div className="flex w-full min-w-0 flex-col gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <TypographyH2>Budget prévisionnel</TypographyH2>
          <p className="mt-1 text-sm text-muted-foreground">
            Vue d'ensemble et suivi détaillé des montants prévus et réels.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full lg:h-9 lg:w-auto"
          onClick={() => setShowGapInPercent((prev) => !prev)}
        >
          <Percent />
          Écart en {showGapInPercent ? "%" : "€"}
        </Button>
      </div>
      <Tabs
        value={lineType}
        onValueChange={(value) => {
          setLineType(value as LineTypeEnum);
          setOnlyUnplanned(false);
        }}
      >
        <TabsList className="h-11">
          <TabsTrigger value={LineTypeEnum.Income}>
            Recettes
            <PiggyBank />
          </TabsTrigger>
          <TabsTrigger value={LineTypeEnum.Expense}>
            Dépenses
            <Coins />
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <BudgetOverview
        rows={rows}
        lineType={lineType}
        showGapInPercent={showGapInPercent}
      />
      <DataTable
        columns={columns}
        data={tableRows}
        onRowClick={(row) => setSelectedRow(row)}
        mobileCardRenderer={(row) => (
          <BudgetMobileCard
            row={row}
            showGapInPercent={showGapInPercent}
            onDelete={handleDeleteLine}
            onEdit={setSelectedRow}
          />
        )}
        actions={(table) => (
          <BudgetTableFiltersAndActions
            table={table}
            lineType={lineType}
            onlyUnplanned={onlyUnplanned}
            unplannedCount={unplannedRows.length}
            onToggleOnlyUnplanned={() => setOnlyUnplanned((prev) => !prev)}
            onClearOnlyUnplanned={() => setOnlyUnplanned(false)}
          />
        )}
      />
      {selectedRow && (
        <EditBudgetLineSheet
          open={!!selectedRow}
          onOpenChange={(open) => {
            if (!open) setSelectedRow(null);
          }}
          line={selectedRow}
          allCategories={categoriesData?.budgetCategories}
        />
      )}
    </div>
  );
}
