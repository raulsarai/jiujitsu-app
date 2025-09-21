

import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { StatCard } from '../components/StatCard';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../navigation';
import { DefaultTheme, useTheme } from 'styled-components';


const SafeContainer = styled(SafeAreaView)(({ theme } : { theme: DefaultTheme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  paddingTop: theme.spacings.xxlarge,
}));

const Header = styled.View(({ theme } : { theme: DefaultTheme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacings.medium,
}));

const HeaderTitle = styled.Text(({ theme } : { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 20,
  fontWeight: 'bold',
}));

const ProfileContainer = styled.View(({ theme } : { theme: DefaultTheme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: theme.spacings.medium,
  marginBottom: theme.spacings.large,
}));

const Avatar = styled.Image({
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 12,
});

const NameContainer = styled.View({});

const NameLabel = styled.Text(({ theme } : { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: theme.fonts.sizes.small,
}));

const NameText = styled.Text(({ theme } : { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: theme.fonts.sizes.medium,
  fontWeight: 'bold',
}));

const BeltImage = styled.Image({
  width: '100%',
  height: 150,
  marginBottom: 16,
});

const StatusText = styled.Text(({ theme } : { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacings.large,
}));

const EvolutionLink = styled.TouchableOpacity(({ theme } : { theme: DefaultTheme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacings.medium,
}));

const EvolutionText = styled.Text(({ theme } : { theme: DefaultTheme }) => ({
  color: '#fff',
  fontSize: theme.fonts.sizes.medium,
  fontWeight: 'bold',
  marginRight: theme.spacings.small,
}));


type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: HomeScreenProps) {

  const theme = useTheme();


  const userData = {
    name: 'Raul Mauro Sarai de Jesus',
    avatarUrl: 'https://i.pravatar.cc/150?u=raulmauro',
    beltStatus: 'Adulto Faixa Branca - Iniciante',
    classesOnBelt: 3,
    classesToNextBelt: 43,
  };

  return (
    <SafeContainer>

      <ScrollView contentContainerStyle={{ padding: 0 }}>
        <ProfileContainer>
          <Avatar source={{ uri: userData.avatarUrl }} />
          <NameContainer>
            <NameLabel>Nome</NameLabel>
            <NameText>{userData.name}</NameText>
          </NameContainer>
          <TouchableOpacity style={{ marginLeft: 'auto',  }} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline"  size={28} color="red" />
        </TouchableOpacity>
        </ProfileContainer>

        <BeltImage source={{ uri: 'https://res.cloudinary.com/glide/image/fetch/f_auto,w_2250,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2Fm2SIjGCqknb44DLod14L%2Fpub%2FrdTixT6epYjklbcuIrdn.jpg' }} resizeMode="cover" />

        <StatusText>{userData.beltStatus}</StatusText>
        
        <View style={{paddingEnd: 20, paddingStart: 20}}>
        <StatCard count={userData.classesOnBelt} label="Aulas realizadas na faixa atual" variant="secondary"/>
        <StatCard count={userData.classesToNextBelt} label="Aulas para a próxima graduação" variant="primary" color='#fff'/>
        </View>

        <EvolutionLink onPress={() => navigation.navigate('Evolution')}>
          <EvolutionText>Veja sua evolução</EvolutionText>
          <Ionicons name="chevron-forward" size={20} color={'#fff'} />
        </EvolutionLink>
      </ScrollView>
    </SafeContainer>
  );
}