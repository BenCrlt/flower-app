import { useEdition } from "@/features/edition/EditionContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const EditionSelector = () => {
  const { editionSelected, setEditionSelected, editions } = useEdition();

  return (
    <div className="flex flex-col space-y-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder="Theme"
            defaultValue={editionSelected?.name}
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {editions.map((edition) => (
              <SelectItem key={edition.id} value={edition.id.toString()}>
                {edition.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
