import React, { FC, ReactNode } from "react";

const WidthContainer = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto w-full max-w-6xl px-8 max-md:px-4">{children}</div>;
};

export default WidthContainer;
