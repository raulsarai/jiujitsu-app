import React from 'react';
import styled, { DefaultTheme } from 'styled-components/native';

const CardContainer = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  flex: 1,
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borders.radius,
  padding: theme.spacings.small,
  margin: theme.spacings.xsmall,
  flexDirection: 'row',
  alignItems: 'center',
}));

const Avatar = styled.Image({
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 8,
});

const InfoContainer = styled.View({
  flex: 1,
});

const NameText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontWeight: 'bold',
}));

const StatusBadge = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  backgroundColor: theme.colors.primary,
  borderRadius: 6,
  paddingVertical: 2,
  paddingHorizontal: 6,
  position: 'absolute',
  right: 8,
  bottom: 0,
}));

const StatusText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.white,
  fontSize: 10,
  fontWeight: 'bold',
}));

interface AttendeeCardProps {
  name: string;
  avatarUrl: string;
  status: string;
}

export function AttendeeCard({ name, avatarUrl, status }: AttendeeCardProps) {
  return (
    <CardContainer>
      <Avatar source={{ uri: avatarUrl }} />
      <InfoContainer>
        <NameText>{name}</NameText>
        <StatusBadge>
          <StatusText>{status.toUpperCase()}</StatusText>
        </StatusBadge>
      </InfoContainer>
    </CardContainer>
  );
}