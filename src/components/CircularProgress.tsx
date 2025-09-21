

import React from 'react';
import { View } from 'react-native';
import styled, { DefaultTheme, useTheme } from 'styled-components/native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View({
  width: 120,
  height: 120,
  justifyContent: 'center',
  alignItems: 'center',
});

const ValueContainer = styled.View({
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
});

const PercentageText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 24,
  fontWeight: 'bold',
}));

interface CircularProgressProps {
  progress: number; // 0 a 100
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({ progress, size = 120, strokeWidth = 10 }: CircularProgressProps) {
  const theme = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Container style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.surface}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.primary}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <ValueContainer>
        <Ionicons name="trophy" size={24} color={theme.colors.text} />
        <PercentageText>{Math.round(progress)}%</PercentageText>
      </ValueContainer>
    </Container>
  );
}