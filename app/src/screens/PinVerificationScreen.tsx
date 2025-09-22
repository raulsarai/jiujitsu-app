import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { PinInput } from '../components/PinInput';

const Container = styled(SafeAreaView)(({ theme }: { theme: DefaultTheme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  justifyContent: 'space-between',
}));

const Content = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  flex: 1,
  alignItems: 'center',
  padding: theme.spacings.large,
  paddingTop: 80,
}));

const Title = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: theme.spacings.medium,
}));

const Subtitle = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  textAlign: 'center',
  marginTop: theme.spacings.small,
  marginBottom: theme.spacings.large,
}));

const ResendLink = styled.TouchableOpacity({});

const ResendText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.primary,
  fontWeight: 'bold',
  marginTop: theme.spacings.medium,
}));

type PinScreenProps = NativeStackScreenProps<RootStackParamList, 'PinVerification'>;

export function PinVerificationScreen({ route, navigation }: PinScreenProps) {
  const { email } = route.params;
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    if (pin === '000000') {
      navigation.navigate('MainTabs');
    } else {
      Alert.alert("PIN Incorreto", "O código inserido não é válido. Tente novamente.");
    }
  };
  
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 60, left: 16, zIndex: 1 }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Content>
        <Ionicons name="mail-open-outline" size={60} color="#D32F2F" />
        <Title>Verifique o seu e-mail</Title>
        <Subtitle>Nós enviamos um código de acesso para {email}</Subtitle>
        
        <PinInput onPinCompleted={setPin} />
        
        <View style={{ marginTop: 24, width: '100%' }}>
            <Button variant="primary" onPress={handleLogin}>Logar</Button>
        </View>

        <ResendLink onPress={() => navigation.navigate('SpamVerification', { email })}>
          <ResendText>não recebi o e-mail</ResendText>
        </ResendLink>
      </Content>
    </Container>
  );
}