import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
const styles = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#c39252] disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#c39252] text-[#101820] hover:bg-[#e0ad6f]",
        outline: "border border-current text-current hover:bg-[#c39252]/10",
        ghost: "text-current hover:bg-[#c39252]/10",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
export function Button({
  asChild = false,
  variant,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof styles> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(styles({ variant }), className)} {...props} />;
}
