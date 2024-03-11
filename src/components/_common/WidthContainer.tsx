import { cn } from "@/utils";
import { ComponentPropsWithoutRef, FC, PropsWithChildren, PropsWithoutRef, ReactNode } from "react";

type Props = ComponentPropsWithoutRef<"div">;

const WidthContainer: FC<Props> = (props) => {
  return (
    <div className={cn(props.className, ["mx-auto size-full max-w-6xl px-8 max-md:px-4"])}>
      {props.children}
    </div>
  );
};

export default WidthContainer;
