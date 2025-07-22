import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const CommonMotionDropdown = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{ open: boolean; className?: string }>>(
  ({ open, children, className }, ref) => (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.6 }}
          className={className}
          style={{ position: "absolute", zIndex: 100 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
);
