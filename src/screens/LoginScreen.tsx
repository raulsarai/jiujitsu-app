
import React, { useState } from 'react';
import { StatusBar, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { Button } from '../components/Button';
import { StyledTextInput } from '../components/StyledTextInput';
import { DefaultTheme } from 'styled-components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

const Background = styled(ImageBackground)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const Container = styled.View({
  width: '90%',
  maxWidth: 400,
  alignItems: 'center',
});

const Logo = styled.Image(({ theme }: { theme: DefaultTheme }) => ({
  width: 100,
  height: 100,
  marginBottom: theme.spacings.large,
}));

const Title = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: theme.fonts.sizes.xlarge,
  fontWeight: theme.fonts.weights.bold,
  textAlign: 'center',
}));

const Subtitle = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: theme.fonts.sizes.medium,
  marginTop: theme.spacings.small,
  marginBottom: theme.spacings.large,
  opacity: 0.3,
  width: '100%',
  align: 'center',
  textAlign: 'center',
}));

const Spacer = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  height: theme.spacings.medium,
}));

const ErrorMessage = styled.Text(({ theme } : { theme: DefaultTheme }) => ({
  color: theme.colors.error,
  fontSize: theme.fonts.sizes.small,
  marginTop: theme.spacings.xsmall,
  width: '100%',
  textAlign: 'left',
}));

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: LoginScreenProps) {

const [email, setEmail] = useState('');
const [error, setError] = useState<string | null>(null);

const handleEmailChange = (text: string) => {
    setEmail(text);
    if (error) {
      setError(null);
    }
  };
  
  const handleContinue = () => {
    if (!email.includes('@') || email.length < 5) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    setError(null);
    navigation.navigate('PinVerification', { email: email });
  };

  return (
    <Background source={require('../assets/images/bg_loginscreen.webp')}>
      <StatusBar barStyle="light-content" />
      <Container>
        {/* <Logo source={require('../assets/images/logo.png')} /> */}
        <Title>Jiu Jitsu | Maná Church</Title>
        <Spacer />
        <Spacer />
        

        <StyledTextInput
            placeholder="Insira o seu e-mail"
            value={email}
            onChangeText={handleEmailChange}
            hasError={!!error}
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        <Spacer />
        <Button variant="primary" onPress={handleContinue}>Continuar</Button>
        
        <Subtitle>______________________________________</Subtitle>
        <Button
          variant="secondary"
          icon={require('../assets/images/google-icon.png')}
        >
          Continuar com o Google    
        </Button>
      </Container>
    </Background>
  );
}