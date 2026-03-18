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
import { useUpdateBudgetLineMutation } from "./useUpdateBudgetLineMutation";

interface DefaultValues extends BudgetLineFormValues {
  id: number;
}

interface Props {
  setOpen: (open: boolean) => void;
  defaultValues: DefaultValues;
}

export function useEditBudgetLineForm({ setOpen, defaultValues }: Props): {
  handleSubmit: () => void;
  handleClose: () => void;
  register: UseFormRegister<BudgetLineFormValues>;
  control: Control<BudgetLineFormValues>;
  setValue: UseFormSetValue<BudgetLineFormValues>;
  errors: FieldErrors<BudgetLineFormValues>;
} {
  const { mutate } = useUpdateBudgetLineMutation();
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
    defaultValues,
  });

  function onSubmit(data: BudgetLineFormValues) {
    mutate({ id: defaultValues.id, ...data });
    handleClose();
  }

  function handleClose() {
    reset(defaultValues);
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
