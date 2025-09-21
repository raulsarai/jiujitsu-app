import React from 'react';
import { TouchableOpacityProps, ImageSourcePropType } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonContainerProps {
  variant?: ButtonVariant;
}

const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>(({ theme, variant = 'primary' }: { theme: DefaultTheme } & ButtonContainerProps) => ({
  backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.surface,
  padding: theme.spacings.medium,
  borderRadius: theme.borders.radius,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Icon = styled.Image(({ theme }: { theme: DefaultTheme }) => ({
  width: 20,
  height: 20,
  marginRight: theme.spacings.small,
}));

const ButtonText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: theme.fonts.sizes.medium,
  fontWeight: theme.fonts.weights.bold,
  textAlign: 'center',
  flex: 1,
}));

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  icon?: ImageSourcePropType;
}

export function Button({ children, variant, icon, ...rest }: ButtonProps) {
  return (
    <ButtonContainer variant={variant} {...rest}>
      {icon && <Icon source={icon} />}
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}