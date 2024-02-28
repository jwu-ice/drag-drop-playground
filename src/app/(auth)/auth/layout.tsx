import { NAVBAR_HEIGHT } from "@/constants/layoutStyle";
import React from "react";

export const metadata = {
  title: "Boards",
  description: "Collaborate with your team",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
