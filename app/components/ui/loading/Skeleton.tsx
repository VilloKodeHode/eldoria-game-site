import React from "react";
import clsx from "clsx";

export const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={clsx("animate-pulse bg-lunar-pearl/10 rounded-md", className)}
  />
);
