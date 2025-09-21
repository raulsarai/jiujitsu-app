

import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

interface ChipContainerProps {
  isActive: boolean;
}

const ChipContainer = styled.TouchableOpacity<ChipContainerProps>(({ theme, isActive }: { theme: DefaultTheme; isActive: boolean }) => ({
  backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
  paddingVertical: theme.spacings.small,
  paddingHorizontal: theme.spacings.medium,
  borderRadius: 50,
  marginRight: theme.spacings.small,
}));

const ChipText = styled.Text<ChipContainerProps>(({ theme, isActive }: { theme: DefaultTheme; isActive: boolean }) => ({
  color: isActive ? theme.colors.white : theme.colors.subtext,
  fontWeight: 'bold',
}));

interface DayChipProps extends TouchableOpacityProps {
  label: string;
  isActive: boolean;
}

export function DayChip({ label, isActive, ...rest }: DayChipProps) {
  return (
    <ChipContainer isActive={isActive} {...rest}>
      <ChipText isActive={isActive}>{label}</ChipText>
    </ChipContainer>
  );
}