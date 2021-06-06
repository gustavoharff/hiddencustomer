import React from 'react';

import { Container, Item, Label, ItemText } from './styles';

interface Option {
  label: string;
  value: string | boolean;
  backgroundColor?: string;
}

interface MultipleOptionInputProps {
  items: Option[];
  label?: string;
  value: string | boolean;
  onChange: (value: any) => void;
}

export function MultipleOptionInput({
  items,
  label,
  value,
  onChange,
}: MultipleOptionInputProps): JSX.Element {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Container>
        {items.map((item, index) => (
          <Item
            key={String(item.value)}
            onPress={() => {
              onChange(item.value);
            }}
            selected={item.value === value}
            style={{
              borderRightWidth: index !== items.length - 1 ? 0 : 1,
            }}
          >
            <ItemText selected={item.value === value}>{item.label}</ItemText>
          </Item>
        ))}
      </Container>
    </>
  );
}
