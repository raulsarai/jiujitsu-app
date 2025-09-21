

import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Ionicons } from '@expo/vector-icons';
import { DetailRow } from '../components/DetailRow';
import { UserData } from '../types/user';


const userData: UserData = {
  name: 'Raul Mauro Sarai de Jesus',
  email: 'raulmauro.sj@gmail.com',
  profileType: "Adulto",
  belt: 'Branca - Iniciante',
  whatsapp: '11992391170',
  birthDate: '1 de novembro de 1991',
  age: 33,
  memberSince: '6 de setembro de 2025',
  avatarUrl: 'https://i.pravatar.cc/150?u=raulmauro',
  coverUrl: 'https://res.cloudinary.com/glide/image/fetch/f_auto,w_2250,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2Fm2SIjGCqknb44DLod14L%2Fpub%2FrdTixT6epYjklbcuIrdn.jpg',
};


const Container = styled(SafeAreaView)(({ theme }: { theme: DefaultTheme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
}));

const HeaderContainer = styled.View({
  alignItems: 'center',
  marginBottom: 60,
});

const CoverImage = styled.Image({
  width: '100%',
  height: 150,
});

const Avatar = styled.Image({
  width: 120,
  height: 120,
  borderRadius: 60,
  borderWidth: 4,
  borderColor: '#121212',
  position: 'absolute',
  top: 90, 
});

const UserInfo = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  alignItems: 'center',
  padding: theme.spacings.medium,
}));

const UserName = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 24,
  fontWeight: 'bold',
}));

const UserEmail = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: 16,
  marginTop: 4,
}));

const EditButton = styled.TouchableOpacity(({ theme }: { theme: DefaultTheme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: 50,
  paddingVertical: 8,
  paddingHorizontal: 24,
  marginTop: 16,
  marginBottom: 16,
}));

const EditText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontWeight: 'bold',
}));

const DetailsCard = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  marginHorizontal: theme.spacings.medium,
  backgroundColor: theme.colors.surfaceAlternate,
  borderRadius: theme.borders.radius,
  padding: theme.spacings.medium,
}));

const FooterText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: 12,
  textAlign: 'center',
  marginTop: theme.spacings.small,
}));

const LogoutButton = styled.TouchableOpacity(({ theme }: { theme: DefaultTheme }) => ({
  margin: theme.spacings.medium,
  marginBottom: '70px',
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borders.radius,
  padding: theme.spacings.medium,
}));

const LogoutText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.primary,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: theme.fonts.sizes.medium,
}));


type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  
  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Você tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", onPress: () => navigation.navigate('Login'), style: 'destructive' }
      ]
    );
  };

  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 60, left: 16, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 15, padding: 4 }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <ScrollView>
        <HeaderContainer>
          <CoverImage source={{ uri: userData.coverUrl }} />
          <Avatar source={{ uri: userData.avatarUrl }} />
        </HeaderContainer>

        <UserInfo>
          <UserName>{userData.name}</UserName>
          <UserEmail>{userData.email}</UserEmail>
          <EditButton onPress={() => navigation.navigate('EditProfile', { user: userData })}>
            <EditText>Editar</EditText>
          </EditButton>
        </UserInfo>

        <DetailsCard>
          <DetailRow label="Nome" value={userData.name} />
          <DetailRow label="Email" value={userData.email} highlight />
          <DetailRow label="Perfil" value={userData.profileType} />
          <DetailRow label="Faixa" value={userData.belt} />
          <DetailRow label="WhatsApp" value={userData.whatsapp} />
          <DetailRow label="Data Nascimento" value={userData.birthDate} />
          <DetailRow label="Idade" value={`${userData.age}`} />
          <FooterText>Cadastro realizado em: {userData.memberSince}</FooterText>
        </DetailsCard>
        
        <LogoutButton onPress={handleLogout}>
          <LogoutText>Sair</LogoutText>
        </LogoutButton>

      </ScrollView>
    </Container>
  );
}