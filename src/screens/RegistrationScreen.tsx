import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Text, Platform, View } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Ionicons } from '@expo/vector-icons';
import { StyledTextInput } from '../components/StyledTextInput';
import { Button } from '../components/Button';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { PickerInput } from '../components/PickerInput';

const beltOptions = [
  { label: 'Selecione uma Faixa', value: '' },
  { label: 'Branca', value: 'branca' },
  { label: 'Azul', value: 'azul' },
  { label: 'Roxa', value: 'roxa' },
  { label: 'Marrom', value: 'marrom' },
  { label: 'Preta', value: 'preta' },
];

const degreeOptions = [
  { label: 'Selecione um Grau', value: 0 },
  { label: 'Iniciante', value: 0 },
  { label: '1º Grau', value: 1 },
  { label: '2º Grau', value: 2 },
  { label: '3º Grau', value: 3 },
  { label: '4º Grau', value: 4 },
];

const Container = styled(SafeAreaView)(({ theme }: { theme: DefaultTheme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  paddingTop: theme.spacings.xxlarge,
}));

const Header = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacings.medium,
}));

const HeaderTitle = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 20,
  fontWeight: 'bold',
  marginLeft: theme.spacings.medium,
}));

const Form = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  padding: theme.spacings.medium,
}));

const FieldGroup = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  marginBottom: theme.spacings.large,
}));

const Label = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  marginBottom: theme.spacings.small,
  fontSize: theme.fonts.sizes.medium,
}));

type RegistrationScreenProps = NativeStackScreenProps<RootStackParamList, 'Registration'>;

export function RegistrationScreen({ navigation }: RegistrationScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [guardianName, setGuardianName] = useState('');
  const [belt, setBelt] = useState('');
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      setIsMinor(age - 1 < 18);
    } else {
      setIsMinor(age < 18);
    }
  }, [birthDate]);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  const handleRegister = () => {
    console.log({ name, email, birthDate, isMinor, guardianName, belt, degree });
    navigation.navigate('MainTabs');
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <HeaderTitle>Cadastro</HeaderTitle>
      </Header>
      <ScrollView>
        <Form>
          <FieldGroup>
            <Label>Nome Completo</Label>
            <StyledTextInput value={name} onChangeText={setName} />
          </FieldGroup>

          <FieldGroup>
            <Label>E-mail</Label>
            <StyledTextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </FieldGroup>
          
          <FieldGroup>
            <Label>Data de Nascimento</Label>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#212121', padding: 16, borderRadius: 8 }}>
              <Ionicons name="calendar" size={24} color="grey" style={{ marginRight: 16 }} />
              <Text style={{ color: 'white' }}>{birthDate.toLocaleDateString('pt-BR')}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker value={birthDate} mode="date" display="default" onChange={onDateChange} />
            )}
          </FieldGroup>
          
          {isMinor && (
            <FieldGroup>
              <Label>Nome do Responsável</Label>
              <StyledTextInput value={guardianName} onChangeText={setGuardianName} />
            </FieldGroup>
          )}

          <FieldGroup>
            <Label>Faixa</Label>
            <PickerInput items={beltOptions} selectedValue={belt} onValueChange={(itemValue) => setBelt(itemValue as string)} />
          </FieldGroup>

          <FieldGroup>
            <Label>Grau</Label>
            <PickerInput items={degreeOptions} selectedValue={degree} onValueChange={(itemValue) => setDegree(itemValue as number)} />
          </FieldGroup>

          <Button variant="primary" onPress={handleRegister}>Cadastrar</Button>
        </Form>
      </ScrollView>
    </Container>
  );
}