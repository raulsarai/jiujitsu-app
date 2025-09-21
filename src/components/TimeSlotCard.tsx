

import React from 'react';
import { View } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

type Status = 'available' | 'checked-in';

const CardContainer = styled.TouchableOpacity(({ theme }: { theme: DefaultTheme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borders.radius,
  padding: theme.spacings.medium,
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: theme.spacings.medium,
}));

const IconContainer = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  marginRight: theme.spacings.medium,
}));

const DetailsContainer = styled.View({
  flex: 1,
});

const TimeText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: theme.fonts.sizes.medium,
  fontWeight: 'bold',
}));

const TypeText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: theme.fonts.sizes.small,
  width: 70,
}));

const StatusContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
});

const CheckedInText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: '#4CAF50',
  marginLeft: 4,
  fontWeight: 'bold',
  fontSize: theme.fonts.sizes.small,
}));

interface TimeSlotCardProps {
  time: string;
  type: string;
  status: Status;
}

export function TimeSlotCard({ time, type, status }: TimeSlotCardProps) {
  return (
    <CardContainer>
      <IconContainer>
        <Ionicons name="calendar-outline" size={24} color="#D32F2F" />
      </IconContainer>
      <DetailsContainer>
        <TimeText>{time}</TimeText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TypeText>{type}</TypeText>
          {status === 'checked-in' && (
            <StatusContainer>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <CheckedInText>Check-in Feito</CheckedInText>
            </StatusContainer>
          )}
        </View>
      </DetailsContainer>
      {status === 'available' && (
        <Ionicons name="chevron-forward" size={24} color="#A9A9A9" />
      )}
    </CardContainer>
  );
}