import { useEdition } from "@/features/edition/EditionContext";
import { AddBudgetLineLineTypeInput } from "@/generated/graphql";
import {
  Control,
  FieldErrors,
  Resolver,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { useAddBudgetLineMutation } from "./useAddBudgetLineMutation";

export type AddBudgetLineFormValues = {
  name: string;
  description: string;
  estimatedQuantity: number;
  estimatedUnitPrice: number;
  budgetCategoryId: number;
};

const resolver: Resolver<AddBudgetLineFormValues> = async (values) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.name) {
    errors.name = { type: "required", message: "Ce champ est requis." };
  }

  if (
    values.estimatedQuantity === undefined ||
    values.estimatedQuantity === null ||
    values.estimatedQuantity === ("" as unknown)
  ) {
    errors.estimatedQuantity = {
      type: "required",
      message: "Ce champ est requis.",
    };
  } else if (isNaN(Number(values.estimatedQuantity))) {
    errors.estimatedQuantity = {
      type: "pattern",
      message: "Doit être un nombre.",
    };
  } else if (values.estimatedQuantity < 0) {
    errors.estimatedQuantity = {
      type: "pattern",
      message: "Doit être supérieur à 1.",
    };
  }

  if (
    values.estimatedUnitPrice === undefined ||
    values.estimatedUnitPrice === null ||
    values.estimatedUnitPrice === ("" as unknown)
  ) {
    errors.estimatedUnitPrice = {
      type: "required",
      message: "Ce champ est requis.",
    };
  } else if (isNaN(Number(values.estimatedUnitPrice))) {
    errors.estimatedUnitPrice = {
      type: "pattern",
      message: "Doit être un nombre.",
    };
  } else if (values.estimatedUnitPrice < 0) {
    errors.estimatedUnitPrice = {
      type: "pattern",
      message: "Doit être supérieur à 0.",
    };
  }

  if (!values.budgetCategoryId) {
    errors.budgetCategoryId = {
      type: "required",
      message: "Ce champ est requis.",
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lineType: AddBudgetLineLineTypeInput;
}

export function useAddBudgetLineForm({ setOpen, lineType }: Props): {
  handleSubmit: () => void;
  handleClose: () => void;
  register: UseFormRegister<AddBudgetLineFormValues>;
  control: Control<AddBudgetLineFormValues>;
  errors: FieldErrors<AddBudgetLineFormValues>;
} {
  const { edition } = useEdition();
  const { mutate } = useAddBudgetLineMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddBudgetLineFormValues>({
    resolver,
    mode: "onTouched",
    defaultValues: { estimatedQuantity: 1, estimatedUnitPrice: 0 },
  });

  function onSubmit(data: AddBudgetLineFormValues) {
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
  };
}
