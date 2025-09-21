import React from 'react';
import { Picker, PickerProps } from '@react-native-picker/picker';
import styled, { DefaultTheme, useTheme } from 'styled-components/native';
import { View } from 'react-native';

const PickerContainer = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borders.radius,
  borderWidth: 1,
  borderColor: theme.colors.border,
  justifyContent: 'center',
}));

interface PickerInputProps extends PickerProps {
  items: { label: string; value: string | number }[];
}

export function PickerInput({ items, ...props }: PickerInputProps) {
  const theme = useTheme();

  return (
    <PickerContainer>
      <Picker
        dropdownIconColor={theme.colors.text}
        style={{ color: theme.colors.text }}
        {...props}
      >
        {items.map((item) => (
          <Picker.Item key={item.label} label={item.label} value={item.value} />
        ))}
      </Picker>
    </PickerContainer>
  );
}