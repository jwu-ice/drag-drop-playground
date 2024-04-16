import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

type SkeletonVariantProps = VariantProps<typeof SkeletonVariants>;

const SkeletonVariants = cva("flex animate-pulse flex-col", {
  variants: {
    variant: {
      card: "",
      cardList: "gap-4",
      kanbanCard: "flex-row gap-4 ",
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
  const CustomSkeleton = () => {
    switch (variant) {
      case "card":
        return <div className="h-16 rounded-md bg-base-content shadow" {...innerProps} />;

      case "cardList":
        return [...Array(4)].map((_, i) => (
          <div key={i} className="h-16 w-full rounded-md bg-base-content shadow" {...innerProps} />
        ));

      case "kanbanCard":
        return [...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-72 min-w-64 rounded-2xl border border-base-content bg-base-300/50 shadow max-sm:min-w-44"
            {...innerProps}
          />
        ));
    }
  };

  return (
    <div className={cn(SkeletonVariants({ variant }))} {...outerProps}>
      {<CustomSkeleton />}
      {children}
    </div>
  );
};

export default Skeleton;
