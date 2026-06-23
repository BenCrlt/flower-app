import { toast, type ExternalToast } from "sonner";

const PAYMENT_TOAST_OPTIONS = {
  position: "top-center",
  duration: 2000,
  dismissible: true,
  closeButton: true,
} satisfies ExternalToast;

export const paymentToast = {
  success: (message: string, options?: ExternalToast) =>
    toast.success(message, { ...PAYMENT_TOAST_OPTIONS, ...options }),
  error: (message: string, options?: ExternalToast) =>
    toast.error(message, { ...PAYMENT_TOAST_OPTIONS, ...options }),
};
