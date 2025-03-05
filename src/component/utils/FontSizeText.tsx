import React from "react";
import { Text, TextProps } from "react-native";
import { useFontSize } from "./FontSizeContext";

type FontSizeTextProps = TextProps & {
  children: React.ReactNode;
};

const FontSizeText: React.FC<FontSizeTextProps> = ({ children, style, ...props }) => {
  const { fontSize } = useFontSize();

  return (
    <Text style={[{ fontSize }, style]} {...props}>
      {children}
    </Text>
  );
};

export default FontSizeText;
