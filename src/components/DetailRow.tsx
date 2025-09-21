

import React from 'react';
import styled, { DefaultTheme } from 'styled-components/native';

const RowContainer = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.spacings.medium,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.surface,
}));

const Label = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: theme.fonts.sizes.small,
  width:'30%',
  textAlign: 'left'
}));

interface ValueProps {
  highlight?: boolean;
}

const Value = styled.Text<ValueProps>(({ theme, highlight }: { theme: DefaultTheme; highlight?: boolean }) => ({
  color: highlight ? theme.colors.primary : theme.colors.text,
  fontSize: theme.fonts.sizes.small,
  fontWeight: 'bold',
}));

interface DetailRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export function DetailRow({ label, value, highlight }: DetailRowProps) {
  return (
    <RowContainer>
      <Label>{label}</Label>
      <Value highlight={highlight}>{value}</Value>
    </RowContainer>
  );
}