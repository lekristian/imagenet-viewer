import { useMemo } from "react";

export const useStyle = (level: number) => {
  const paddingLeft = useMemo(() => `${level * 1.5}rem`, [level]);

  return {
    paddingLeft,
  };
};
