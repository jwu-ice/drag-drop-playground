import ALink from "@/components/_common/ALink";
import React, { HTMLAttributes } from "react";

type Props = {
  routes: LinkType[];
  classname?: string;
};

const LinkList = ({ routes, classname }: Props) => {
  return (
    <div className={classname}>
      {routes?.map(({ href, name }) => {
        return <ALink href={href} name={name} key={href} />;
      })}
    </div>
  );
};

export default LinkList;
