

import React from 'react';
import { Pressable, SafeAreaView, TouchableOpacity, View } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';

const ModalOverlay = styled.Pressable({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
});

const ModalContent = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  width: '90%',
  backgroundColor: theme.colors.background,
  borderRadius: theme.borders.radius,
  padding: theme.spacings.large,
  alignItems: 'center',
}));

const Title = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 22,
  fontWeight: 'bold',
  marginTop: theme.spacings.medium,
}));

const Subtitle = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  textAlign: 'center',
  marginTop: theme.spacings.small,
  marginBottom: theme.spacings.large,
  lineHeight: 22,
}));

const HighlightedEmail = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontWeight: 'bold',
}));

const CloseLink = styled.TouchableOpacity({});

const CloseLinkText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.primary,
  fontWeight: 'bold',
  marginTop: theme.spacings.medium,
}));

type SpamScreenProps = NativeStackScreenProps<RootStackParamList, 'SpamVerification'>;

export function SpamVerificationScreen({ route, navigation }: SpamScreenProps) {
  const { email } = route.params;

  return (
    <ModalOverlay onPress={() => navigation.goBack()}>
      <Pressable>
        <ModalContent>
            <Ionicons name="mail-unread-outline" size={60} color="#D32F2F" />
            <Title>Verifique seu spam</Title>
            <Subtitle>
                Verifique sua pasta de spam. Aguarde alguns minutos para que chegue. O PIN foi enviado para <HighlightedEmail>{email}</HighlightedEmail>
            </Subtitle>
            
            <View style={{ width: '100%' }}>
                <Button variant="primary" icon={undefined} onPress={() => navigation.navigate('PinVerification', { email: email })}>encontrei o pin</Button>
            </View>

            <CloseLink onPress={() => navigation.navigate('SearchEmail', { email })}>
                <CloseLinkText>Nenhum e-mail na pasta de spam</CloseLinkText>
            </CloseLink>
        </ModalContent>
      </Pressable>
    </ModalOverlay>
  );
}