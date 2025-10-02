"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

const UserDashboard = () => {
  const { user } = useKindeBrowserClient();

  return <div>UserDashboard</div>;
};

export default UserDashboard;
