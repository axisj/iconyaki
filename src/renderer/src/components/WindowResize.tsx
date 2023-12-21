import { useAppStore } from "../store/useAppStore";
import { useCallback, useEffect } from "react";

export const WindowResize = () => {
  const setWidthHeight = useAppStore((s) => s.setWidthHeight);

  const handleGetWindowSize = useCallback(() => {
    setWidthHeight(window.innerWidth, window.innerHeight);
  }, [setWidthHeight]);

  useEffect(() => {
    setWidthHeight(window.innerWidth, window.innerHeight);
    document.body.style.overscrollBehavior = "contain"; // prevent history move by wheel event
    window.addEventListener("resize", handleGetWindowSize);

    return () => {
      window.removeEventListener("resize", handleGetWindowSize);
    };
  }, [handleGetWindowSize, setWidthHeight]);

  return null;
};
