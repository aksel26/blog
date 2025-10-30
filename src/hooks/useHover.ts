import { useState, useCallback } from "react";

interface HoverStyles {
  transform?: string;
  backgroundColor?: string;
  color?: string;
  boxShadow?: string;
}

interface UseHoverOptions {
  hoverStyles?: HoverStyles;
  defaultStyles?: HoverStyles;
}

export const useHover = (options: UseHoverOptions = {}) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const getStyles = useCallback(() => {
    return isHovered ? options.hoverStyles : options.defaultStyles;
  }, [isHovered, options.hoverStyles, options.defaultStyles]);

  return {
    isHovered,
    onMouseEnter,
    onMouseLeave,
    getStyles,
    hoverProps: {
      onMouseEnter,
      onMouseLeave,
    },
  };
};
