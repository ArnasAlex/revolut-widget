import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { color } from "../styles";

export const Input = styled.input<{ width: number }>`
  border: none;
  outline: none;
  color: ${color.white};
  background: ${color.transparent};
  min-width: 10px;
  font-size: inherit;
  width: ${(props) => props.width}px;
`;

const WidthMeasure = styled.div`
  position: absolute;
  height: 0;
  overflow: hidden;
  white-space: pre;
`;

interface AmountInputProps {
  value: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (text: string) => void;
}

export function AmountInput({ value, inputRef, onChange }: AmountInputProps) {
  const measureRef = React.useRef<HTMLDivElement>(null);
  const [inputWidth, setInputWidth] = useState(0);

  const handleChange = useCallback(
    (evt) => {
      onChange(evt.target.value);
    },
    [onChange]
  );

  React.useEffect(() => {
    const { current: measureEl } = measureRef;
    if (measureEl) {
      measureEl.textContent = value;
      setInputWidth(measureEl.offsetWidth);
    }
  }, [value, inputRef, setInputWidth]);

  return (
    <>
      <WidthMeasure ref={measureRef} />
      <Input
        ref={inputRef}
        onChange={handleChange}
        value={value}
        width={inputWidth}
      />
    </>
  );
}
