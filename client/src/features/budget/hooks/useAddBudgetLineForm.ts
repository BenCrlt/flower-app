import { useEdition } from "@/features/edition/EditionContext";
import { LineTypeEnum } from "@/generated/graphql";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  budgetLineFormResolver,
  BudgetLineFormValues,
} from "./budgetLineFormResolver";
import { useAddBudgetLineMutation } from "./useAddBudgetLineMutation";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lineType: LineTypeEnum;
}

export function useAddBudgetLineForm({ setOpen, lineType }: Props): {
  handleSubmit: () => void;
  handleClose: () => void;
  register: UseFormRegister<BudgetLineFormValues>;
  control: Control<BudgetLineFormValues>;
  errors: FieldErrors<BudgetLineFormValues>;
  setValue: UseFormSetValue<BudgetLineFormValues>;
} {
  const { edition } = useEdition();
  const { mutate } = useAddBudgetLineMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<BudgetLineFormValues>({
    resolver: budgetLineFormResolver,
    mode: "onTouched",
    defaultValues: { estimatedQuantity: 1, estimatedUnitPrice: 0 },
  });

  function onSubmit(data: BudgetLineFormValues) {
    mutate({
      ...data,
      editionId: edition.id,
      lineType,
    });
    handleClose();
  }

  function handleClose() {
    reset();
    setOpen(false);
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    handleClose,
    register,
    control,
    errors,
    setValue,
  };
}
