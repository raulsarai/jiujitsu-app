import React, { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Text, Platform, View, Pressable } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Ionicons } from '@expo/vector-icons';
import { StyledTextInput } from '../components/StyledTextInput';
import { Button } from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { UserData } from '../types/user';

const ModalPressableOverlay = styled.Pressable({
  flex: 1,
  justifyContent: 'flex-end',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const ModalContent = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  height: '90%',
  backgroundColor: theme.colors.background,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: 'hidden',
}));

const Header = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacings.medium,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.surface,
}));

const HeaderTitle = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 20,
  fontWeight: 'bold',
}));

const Form = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  padding: theme.spacings.medium,
}));

const Label = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  marginBottom: theme.spacings.small,
  fontSize: theme.fonts.sizes.medium,
}));

const RequiredLabel = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: theme.fonts.sizes.small,
}));

const FieldGroup = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  marginBottom: theme.spacings.large,
}));

const Row = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const SegmentedButton = styled.TouchableOpacity<{ isActive: boolean }>(({ theme, isActive }: { theme: DefaultTheme; isActive: boolean }) => ({
  backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  flex: 1,
  alignItems: 'center',
}));

const SegmentedButtonText = styled.Text<{ isActive: boolean }>(({ theme, isActive }: { theme: DefaultTheme; isActive: boolean }) => ({
  color: theme.colors.text,
  fontWeight: isActive ? 'bold' : 'normal',
}));

const ImagePreview = styled.Image({
  width: 50,
  height: 50,
  borderRadius: 8,
  marginRight: 16,
});

const StaticText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: 16,
  paddingVertical: 16,
}));

const Footer = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  flexDirection: 'row',
  padding: theme.spacings.medium,
  borderTopWidth: 1,
  borderTopColor: theme.colors.surface,
}));

type EditProfileProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export function EditProfileScreen({ route, navigation }: EditProfileProps) {
  const { user } = route.params;

  const [name, setName] = useState(user.name);
  const [profileType, setProfileType] = useState(user.profileType);
  const [imageUri, setImageUri] = useState<string | null>(user.avatarUrl);
  const [date, setDate] = useState(new Date(1991, 10, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };
  
  const handleSave = () => {
    console.log({ name, profileType, imageUri, date });
    navigation.goBack();
  };

  return (
    <ModalPressableOverlay onPress={() => navigation.goBack()}>
      <Pressable>
        <ModalContent>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <Header>
              <View style={{ width: 24 }} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </Header>
            <ScrollView>
              <Form>
                <FieldGroup>
                  <TouchableOpacity onPress={pickImage} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#212121', padding: 8, borderRadius: 8 }}>
                    {imageUri && <ImagePreview source={{ uri: imageUri }} />}
                    <Text style={{ color: 'white', flex: 1 }}>{imageUri ? '...' + imageUri.slice(-20) : 'Selecione uma imagem'}</Text>
                    <TouchableOpacity onPress={() => setImageUri(null)}><Ionicons name="close-circle" size={24} color="grey" /></TouchableOpacity>
                  </TouchableOpacity>
                </FieldGroup>

                <FieldGroup>
                  <Label>Perfil</Label>
                  <Row style={{ gap: 10 }}>
                    <SegmentedButton isActive={profileType === 'Adulto'} onPress={() => setProfileType('Adulto')}>
                      <SegmentedButtonText isActive={profileType === 'Adulto'}>Adulto</SegmentedButtonText>
                    </SegmentedButton>
                    <SegmentedButton isActive={profileType === 'Infantil'} onPress={() => setProfileType('Infantil')}>
                      <SegmentedButtonText isActive={profileType === 'Infantil'}>Infantil</SegmentedButtonText>
                    </SegmentedButton>
                  </Row>
                </FieldGroup>
                
                <FieldGroup>
                  <Label>Nome</Label>
                  <StyledTextInput value={name} onChangeText={setName} />
                </FieldGroup>

        

                <FieldGroup>
                  <Label>Email</Label>
                  <StaticText>{user.email}</StaticText>
                </FieldGroup>

                <FieldGroup>
                  <Label>Faixa</Label>
                  <StaticText>{user.belt}</StaticText>
                </FieldGroup>

                <FieldGroup>
                  <Label>Data Nascimento</Label>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#212121', padding: 16, borderRadius: 8 }}>
                    <Ionicons name="calendar" size={24} color="grey" style={{ marginRight: 16 }} />
                    <Text style={{ color: 'white' }}>{date.toLocaleDateString('pt-BR')}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onDateChange}
                    />
                  )}
                </FieldGroup>

              </Form>
            </ScrollView>
            <Footer>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button variant="secondary" onPress={() => navigation.goBack()}>Cancelar</Button>
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Button variant="primary" onPress={handleSave}>Enviar</Button>
              </View>
            </Footer>
          </SafeAreaView>
        </ModalContent>
      </Pressable>
    </ModalPressableOverlay>
  );
}