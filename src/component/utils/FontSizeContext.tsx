import React, { createContext, useContext, useState, ReactNode } from "react";

type FontSizeContextType = {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState<number>(16);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 30));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 10));

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
};
