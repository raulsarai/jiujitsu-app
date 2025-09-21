

import React from 'react';
import { TextInputProps } from 'react-native';
import { DefaultTheme } from 'styled-components';
import styled from 'styled-components/native';

interface InputProps {
  hasError?: boolean;
}

const Input = styled.TextInput.attrs(({ theme } : { theme: DefaultTheme }) => ({
  placeholderTextColor: theme.colors.subtext,
  underlineColorAndroid: 'transparent',
}))<InputProps>(({ theme, hasError=false }: { theme: DefaultTheme } & InputProps) => ({
  backgroundColor: theme.colors.surface,
  color: theme.colors.text,
  borderRadius: theme.borders.radius,
  borderWidth: 1,
  borderColor: hasError ? theme.colors.error : theme.colors.border,
  padding: theme.spacings.medium,
  fontSize: theme.fonts.sizes.medium,
  width: '100%',
}));

interface StyledTextInputProps extends TextInputProps {
  hasError?: boolean;
}

export function StyledTextInput(props: StyledTextInputProps) {
  return <Input {...props} />;
}