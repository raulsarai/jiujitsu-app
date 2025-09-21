import React from 'react';
import { Pressable, View } from 'react-native';
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
  textAlign: 'center',
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

type SearchEmailProps = NativeStackScreenProps<RootStackParamList, 'SearchEmail'>;

export function SearchEmailScreen({ route, navigation }: SearchEmailProps) {
  const { email } = route.params;

  return (
    <ModalOverlay onPress={() => navigation.goBack()}>
      <Pressable>
        <ModalContent>
          <Ionicons name="search-outline" size={60} color="#D32F2F" />
          <Title>Pesquisar todos os e-mails</Title>
          <Subtitle>
            Enviamos a você outro e-mail de pin. Verifique novamente e, se necessário, procure e-mails de <HighlightedEmail>no-reply@auth.appnotify.io</HighlightedEmail>. O PIN foi enviado para <HighlightedEmail>{email}</HighlightedEmail>
          </Subtitle>
          
          <View style={{ width: '100%' }}>
            <Button variant="primary" onPress={() => navigation.navigate('PinVerification', { email: email })}>encontrei o pin</Button>
          </View>

          <CloseLink onPress={() => navigation.navigate('ContactIT', { email })}>
            <CloseLinkText>Ainda não consigo encontrar o e-mail</CloseLinkText>
          </CloseLink>
        </ModalContent>
      </Pressable>
    </ModalOverlay>
  );
}