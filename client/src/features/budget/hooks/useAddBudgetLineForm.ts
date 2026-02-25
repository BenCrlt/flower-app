import {
  FieldErrors,
  Resolver,
  useForm,
  UseFormRegister,
} from "react-hook-form";

export type AddBudgetLineFormValues = {
  name: string;
  description: string;
  quantity: number;
  cost: number;
};

const resolver: Resolver<AddBudgetLineFormValues> = async (values) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.name) {
    errors.name = { type: "required", message: "Ce champ est requis." };
  }

  if (
    values.quantity === undefined ||
    values.quantity === null ||
    values.quantity === ("" as unknown)
  ) {
    errors.quantity = { type: "required", message: "Ce champ est requis." };
  } else if (isNaN(Number(values.quantity))) {
    errors.quantity = { type: "pattern", message: "Doit être un nombre." };
  } else if (values.quantity < 0) {
    errors.quantity = { type: "pattern", message: "Doit être supérieur à 1." };
  }

  if (
    values.cost === undefined ||
    values.cost === null ||
    values.cost === ("" as unknown)
  ) {
    errors.cost = { type: "required", message: "Ce champ est requis." };
  } else if (isNaN(Number(values.cost))) {
    errors.cost = { type: "pattern", message: "Doit être un nombre." };
  } else if (values.cost < 0) {
    errors.cost = { type: "pattern", message: "Doit être supérieur à 0." };
  }
  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useAddBudgetLineForm({ setOpen }: Props): {
  handleSubmit: () => void;
  handleClose: () => void;
  register: UseFormRegister<AddBudgetLineFormValues>;
  errors: FieldErrors<AddBudgetLineFormValues>;
} {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBudgetLineFormValues>({
    resolver,
    mode: "onTouched",
    defaultValues: { quantity: 1, cost: 0 },
  });

  function onSubmit(data: AddBudgetLineFormValues) {
    console.log(data);
  }

  function handleClose() {
    reset();
    setOpen(false);
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    handleClose,
    register,
    errors,
  };
}
