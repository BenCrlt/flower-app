import { OTPInput } from "input-otp";
import * as React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

export type PinInputProps = Omit<
  React.ComponentPropsWithoutRef<typeof OTPInput>,
  "maxLength" | "render"
>;

export const PinInput = React.forwardRef<
  React.ComponentRef<typeof OTPInput>,
  PinInputProps
>(function PinInput(props, ref) {
  return (
    <InputOTP ref={ref} maxLength={6} {...props}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
});
