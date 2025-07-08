"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ScrollContextProps {
  allowScroll: boolean;
  setAllowScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [allowScroll, setAllowScroll] = useState(true);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!allowScroll) {
        e.preventDefault();
      }
    };

    // Apply overflow hidden to body when scroll is disabled
    if (!allowScroll) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      // Add passive: false to ensure preventDefault works on iOS
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.removeEventListener("touchmove", handleTouchMove);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [allowScroll]);

  return (
    <ScrollContext.Provider value={{ allowScroll, setAllowScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
