import React from "react";

export const metadata = {
  title: "Boards",
  description: "Collaborate with your team",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-center">{children}</div>;
};

export default AuthLayout;
