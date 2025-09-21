// path: src/components/Button.tsx

import React from 'react';
import { TouchableOpacityProps, ImageSourcePropType } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonContainerProps {
  variant?: ButtonVariant;
}

const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>(({ theme, variant }: { theme: DefaultTheme } & ButtonContainerProps) => ({
  backgroundColor: variant === 'primary' ? theme.colors.primary : variant === 'secondary' ? theme.colors.secondary :theme.colors.surface,
  padding: theme.spacings.medium,
  borderRadius: theme.borders.radius,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ButtonText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: theme.fonts.sizes.medium,
  fontWeight: theme.fonts.weights.bold,
  textAlign: 'center',
}));

const Icon = styled.Image(({ theme }: { theme: DefaultTheme }) => ({
  width: 30,
  height: 30,
  marginRight: theme.spacings.medium,
}));

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  icon?: ImageSourcePropType;
}

export function Button({ children, variant = 'primary', icon, ...rest }: ButtonProps) {
  return (
    <ButtonContainer variant={variant} {...rest}>
      {icon && <Icon source={icon} />}
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}