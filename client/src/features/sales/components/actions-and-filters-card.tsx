import { DateRangePicker, StrictDateRange } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { ListFilter, Store } from "lucide-react";

interface Props {
  originIdsFilter: number[];
  handleSelectOrigin: (originId: number, checked: boolean) => void;
  originOptions: { id: number; name: string }[];
  dateRange: StrictDateRange;
  handleSelectDateRange: (dateRange: StrictDateRange) => void;
}

export const SalesPanelActionsAndFiltersCard = ({
  originIdsFilter,
  originOptions,
  handleSelectOrigin,
  dateRange,
  handleSelectDateRange,
}: Props) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle>Filtres</CardTitle>
            <CardDescription>
              Filtrez les commandes par auteur et période.
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <DateRangePicker
              dateRange={dateRange}
              handleSelectDateRange={handleSelectDateRange}
            />
            {originOptions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={originIdsFilter.length ? "default" : "outline"}
                    className={"w-full border-dashed sm:w-auto sm:max-w-fit"}
                  >
                    <ListFilter />
                    Origine{" "}
                    {originIdsFilter.length
                      ? `(${originIdsFilter.length})`
                      : ""}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-44">
                  <DropdownMenuGroup>
                    {originOptions.map((origin) => (
                      <DropdownMenuCheckboxItem
                        key={origin.id}
                        className="capitalize"
                        checked={originIdsFilter.includes(origin.id)}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) =>
                          handleSelectOrigin(origin.id, value)
                        }
                      >
                        {origin.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          className="w-full shrink-0 border-dashed md:w-auto"
        >
          <Link to="/cash-register">
            Ouvrir la caisse
            <Store />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
