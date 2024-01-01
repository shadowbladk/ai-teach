import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const backgroundVariances = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        defualt: "bg-sky-100",
        success: "bg-emerald-100",
      },
      iconVariant: {
        defualt: "text-sky-700",
        success: "text-emerald-700",
      },
      size: {
        defualt: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "defualt",
      size: "defualt",
    },
  }
);

const iconVarinces = cva("", {
  variants: {
    variant: {
      defualt: "text-sky-700",
      success: "text-emerald-700",
    },
    size: {
      defualt: "h-8 w-8",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "defualt",
    size: "defualt",
  },
});

type BackgroudVariantProps = VariantProps<typeof backgroundVariances>;
type IconVariantProps = VariantProps<typeof iconVarinces>;

interface IconBadgeProps extends BackgroudVariantProps, IconVariantProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariances({ variant, size }))}>
      <Icon className={cn(iconVarinces({ variant, size }))} />
    </div>
  );
};
