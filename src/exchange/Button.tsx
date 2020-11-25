import React, { useCallback } from "react";
import styled from "styled-components";
import { color, fontSize } from "../styles";

export const ButtonElement = styled.button<{ disabled?: boolean }>`
  border: none;
  outline: none;
  padding: 15px 20px;
  background: ${color.transparent};
  color: ${(props) => (props.disabled ? color.whiteTransparent : color.white)};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  font-size: ${fontSize.base}px;
`;

interface ButtonProps {
  children: React.ReactChild;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <ButtonElement disabled={!onClick} onClick={handleClick}>
      {children}
    </ButtonElement>
  );
}
