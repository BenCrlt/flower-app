import { PropsWithChildren } from "react";

export function TypographyH1({ children }: PropsWithChildren) {
  return (
    <h1 className="scroll-m-20 text-center text-3xl font-semibold tracking-tight text-balance">
      {children}
    </h1>
  );
}

export function TypographyH2({ children }: PropsWithChildren) {
  return (
    <h2 className="scroll-m-20 text-2xl font-medium tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyP({ children }: PropsWithChildren) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
