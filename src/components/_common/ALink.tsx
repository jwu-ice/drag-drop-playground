"use client";

import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  name: string;
};

const ALink = ({ href, name }: Props) => {
  const path = usePathname();

  const isCurrent = path === href;

  return (
    <Link
      href={href}
      className={cn([
        "text-lg transition-all hover:opacity-80 hover:drop-shadow-lg max-sm:text-base",
        isCurrent ? "font-bold" : "text-gray-500",
      ])}
    >
      {name}
    </Link>
  );
};

export default ALink;
