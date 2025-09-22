import React from 'react';
import { Pressable, View, Linking, Alert } from 'react-native';
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
  color: theme.colors.subtext,
  fontWeight: 'bold',
  marginTop: theme.spacings.medium,
}));

type ContactITProps = NativeStackScreenProps<RootStackParamList, 'ContactIT'>;

export function ContactITScreen({ route, navigation }: ContactITProps) {
  const { email } = route.params;

  const handleWriteEmail = async () => {
    const url = `mailto:no-reply@auth.appnotify.io?subject=Ajuda com Acesso ao App&body=Olá, não estou conseguindo acessar o app com o e-mail: ${email}`;
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erro", "Não foi possível abrir o aplicativo de e-mail.");
    }
  };

  return (
    <ModalOverlay onPress={() => navigation.goBack()}>
      <Pressable>
        <ModalContent>
          <Ionicons name="headset-outline" size={60} color="#D32F2F" />
          <Title>Entre em contato com a TI</Title>
          <Subtitle>
            Podemos ajudar você a enviar instruções à sua equipe de TI para permitir e-mails de <HighlightedEmail>no-reply@auth.appnotify.io</HighlightedEmail>
          </Subtitle>
          
          <View style={{ width: '100%', marginBottom: 16 }}>
            <Button variant="primary" onPress={handleWriteEmail}>Escrever e-mail</Button>
          </View>
          <View style={{ width: '100%' }}>
            <Button variant="secondary" onPress={() => navigation.navigate('PinVerification', { email: email })}>encontrei o pin</Button>
          </View>

          <CloseLink onPress={() => navigation.navigate('Login')}>
            <CloseLinkText>Voltar para o login</CloseLinkText>
          </CloseLink>
        </ModalContent>
      </Pressable>
    </ModalOverlay>
  );
}