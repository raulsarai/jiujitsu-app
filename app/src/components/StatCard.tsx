

import React from 'react';
import { DefaultTheme, useTheme } from 'styled-components';
import styled from 'styled-components/native';

interface CardProps {
  variant?: 'primary' | 'secondary';
}

const CardContainer = styled.View<CardProps>(({ theme, variant = 'secondary' } : { theme: DefaultTheme } & CardProps) => ({
  backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.surface,
  borderRadius: theme.borders.radius,
  padding: theme.spacings.medium,
  width: '100%',
  alignItems: 'center',
  marginBottom: theme.spacings.medium,
}));

const CountText = styled.Text(({ theme } : { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 48,
  fontWeight: 'bold',
}));

const LabelText = styled.Text(({ theme, color }: { theme: DefaultTheme } & StatCardProps) => ({
  color: color || theme.colors.subtext,
  fontSize: theme.fonts.sizes.xsmall,
  width: '100%',
  textAlign: 'center',
}));

interface StatCardProps {
  count: number;
  label: string;
  variant?: 'primary' | 'secondary';
  color?: string;
}

export function StatCard({ count, label, variant, color }: StatCardProps) {
    const theme = useTheme();
  return (
    <CardContainer variant={variant}>
      <CountText>{count}</CountText>
      <LabelText color={color ? color : theme.colors.subtext}>{label}</LabelText>
    </CardContainer>
  );
}