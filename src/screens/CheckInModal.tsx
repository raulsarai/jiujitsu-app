import React from 'react';
import { SafeAreaView, Pressable, FlatList, View, TouchableOpacity } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { AttendeeCard } from '../components/AttendeeCard';

const attendees = [
    { id: '1', name: 'Pedro Leonardo Diniz dos Santos', avatarUrl: 'https://i.pravatar.cc/150?u=pedro', status: 'Pendente' },
    { id: '2', name: 'Eloiza', avatarUrl: 'https://i.pravatar.cc/150?u=eloiza', status: 'Pendente' },
    { id: '3', name: 'Karine leite pinheiro de Almeida', avatarUrl: 'https://i.pravatar.cc/150?u=karine', status: 'Pendente' },
    { id: '4', name: 'João Lucca Ferreira dos Santos', avatarUrl: 'https://i.pravatar.cc/150?u=joao', status: 'Pendente' },
];

const ModalOverlay = styled.Pressable({
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

const ClassDetails = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
  padding: theme.spacings.medium,
  borderRadius: theme.borders.radius,
  margin: theme.spacings.medium,
}));

const ClassTime = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 16,
  marginLeft: theme.spacings.small,
  width: '80%',
}));

const SectionTitle = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  marginHorizontal: theme.spacings.medium,
  marginBottom: theme.spacings.small,
  fontSize: theme.fonts.sizes.medium,
}));

type CheckInProps = NativeStackScreenProps<RootStackParamList, 'CheckInModal'>;

export function CheckInModal({ route, navigation }: CheckInProps) {
  const { scheduleItem } = route.params;

  return (
    <ModalOverlay onPress={() => navigation.goBack()}>
      <Pressable>
        <ModalContent>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
            <Header>
              <View style={{ width: 24 }} />
              <HeaderTitle>{scheduleItem.type}</HeaderTitle>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </Header>
            <ClassDetails>
              <Ionicons name="time-outline" size={24} color="white" />
              <ClassTime>{scheduleItem.time}</ClassTime>
            </ClassDetails>
            <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
              <Button variant="primary">Fazer Check-in</Button>
            </View>
            <SectionTitle>Lista de Presença</SectionTitle>
            <FlatList
              data={attendees}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({ item }) => <AttendeeCard {...item} />}
              contentContainerStyle={{ paddingHorizontal: 12 }}
            />
          </SafeAreaView>
        </ModalContent>
      </Pressable>
    </ModalOverlay>
  );
}