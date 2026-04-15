import { DateRangePicker, StrictDateRange } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

interface Props {
  authorIdsFilter: string[];
  handleSelectAuthor: (authorId: string, checked: boolean) => void;
  authorOptions: { id: string; name: string }[];
  dateRange: StrictDateRange;
  handleSelectDateRange: (dateRange: StrictDateRange) => void;
}

export const SalesPanelActionsAndFiltersCard = ({
  authorIdsFilter,
  authorOptions,
  handleSelectAuthor,
  dateRange,
  handleSelectDateRange,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
        <CardDescription>
          Filtrez les commandes par auteur et période.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={authorIdsFilter.length ? "default" : "outline"}
              className={"border-dashed max-w-fit"}
            >
              <ListFilter />
              Auteur{" "}
              {authorIdsFilter.length ? `(${authorIdsFilter.length})` : ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuGroup>
              {authorOptions.map((author) => (
                <DropdownMenuCheckboxItem
                  key={author.id}
                  className="capitalize"
                  checked={authorIdsFilter.includes(author.id)}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={(value) =>
                    handleSelectAuthor(author.id, value)
                  }
                >
                  {author.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DateRangePicker
          dateRange={dateRange}
          handleSelectDateRange={handleSelectDateRange}
        />
      </CardContent>
    </Card>
  );
};
