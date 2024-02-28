import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

type SkeletonVariantProps = VariantProps<typeof SkeletonVariants>;

const SkeletonVariants = cva("flex w-full animate-pulse flex-col", {
  variants: {
    variant: {
      card: "",
      cardList: "gap-4",
    },
  },
  defaultVariants: {
    variant: "card",
  },
});

export type SkeletonProps = {
  children?: ReactNode;
  outerProps?: ComponentPropsWithoutRef<"div">;
  innerProps?: ComponentPropsWithoutRef<"div">;
} & Omit<SkeletonVariantProps, "variant"> &
  Required<Pick<SkeletonVariantProps, "variant">>;

const Skeleton: FC<SkeletonProps> = ({ variant, outerProps, innerProps, children }) => {
  const ResultComponent = () => {
    switch (variant) {
      case "card":
        return <div className="h-16 w-full rounded-md bg-base-content shadow" {...innerProps} />;

      case "cardList":
        return Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 w-full rounded-md bg-base-content shadow" {...innerProps} />
        ));
    }
  };

  return (
    <div className={cn(SkeletonVariants({ variant }))} {...outerProps}>
      {<ResultComponent />}
      {children}
    </div>
  );
};

export default Skeleton;
