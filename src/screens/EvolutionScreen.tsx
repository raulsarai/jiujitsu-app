

import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { StatCard } from '../components/StatCard';
import { CircularProgress } from '../components/CircularProgress';
import { Ionicons } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../navigation';

const attendanceHistory = [
  { id: '1', date: '20/09/2025', type: 'Adulto | Presente', time: '15h → 16:30' },
  { id: '2', date: '18/09/2025', type: 'Adulto | Presente', time: '20h → 21:30' },
  { id: '3', date: '16/09/2025', type: 'Adulto | Presente', time: '20h → 21:30' },
];

type EvolutionScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Evolution'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Container = styled(SafeAreaView)(({ theme }: { theme: DefaultTheme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  paddingTop: theme.spacings.xxlarge,
}));

const BeltImage = styled.Image({
  width: '100%',
  height: 150,
  marginBottom: 16,
});

const StatusText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  marginVertical: theme.spacings.large,
}));

const ProgressContainer = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: theme.spacings.medium,
  paddingEnd: 30,
  marginBottom: theme.spacings.large,
}));

const CtaCard = styled.TouchableOpacity(({ theme }: { theme: DefaultTheme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borders.radius,
  padding: theme.spacings.medium,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginHorizontal: theme.spacings.medium,
  marginBottom: theme.spacings.large,
}));

const CtaTextContainer = styled.View({});

const CtaTitle = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontWeight: 'bold',
  fontSize: theme.fonts.sizes.medium,
}));

const CtaSubtitle = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: theme.fonts.sizes.small,
}));

const SectionTitle = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  marginHorizontal: theme.spacings.medium,
  marginBottom: theme.spacings.small,
}));

const HistoryCard = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borders.radius,
  padding: theme.spacings.medium,
  marginHorizontal: theme.spacings.medium,
  marginBottom: theme.spacings.small,
}));

const HistoryDate = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: theme.fonts.sizes.small,
}));

const HistoryDetails = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: theme.fonts.sizes.medium,
  fontWeight: 'bold',
}));

export function EvolutionScreen({ navigation }: EvolutionScreenProps) {
  const userData = {
    beltStatus: 'Adulto Faixa Branca - Iniciante',
    classesOnBelt: 3,
    classesToNextBelt: 43,
    progressPercentage: 1,
  };

  return (
    <Container>                
        <BeltImage source={{ uri: 'https://res.cloudinary.com/glide/image/fetch/f_auto,w_2250,c_limit/https%3A%2F%2Fstorage.googleapis.com%2Fglide-prod.appspot.com%2Fuploads-v2%2Fm2SIjGCqknb44DLod14L%2Fpub%2FrdTixT6epYjklbcuIrdn.jpg' }} resizeMode="cover" />
        <StatusText>{userData.beltStatus}</StatusText>
      <ScrollView>
  

        <ProgressContainer>
          <View style={{ flex: 0.8, alignItems: 'center'}}>
            <StatCard count={userData.classesOnBelt} label="Aulas realizadas na faixa atual" />
          </View>
          <CircularProgress progress={userData.progressPercentage} size={100} strokeWidth={8}/>
        </ProgressContainer>

        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <StatCard count={userData.classesToNextBelt} label="Aulas para a próxima graduação" variant="primary" color='#fff'/>
        </View>

        <CtaCard onPress={() => navigation.navigate('Schedule')}>
          <CtaTextContainer>
            <CtaTitle>Evolução Constante!</CtaTitle>
            <CtaSubtitle>Agende sua próxima aula e continue evoluindo</CtaSubtitle>
          </CtaTextContainer>
          <Ionicons name="calendar" size={24} color="#FFF" />
        </CtaCard>

        <SectionTitle>Acompanhe seu Progresso</SectionTitle>
        {attendanceHistory.map(item => (
          <HistoryCard key={item.id}>
            <HistoryDate>{item.date}</HistoryDate>
            <HistoryDetails>{item.type}</HistoryDetails>
            <HistoryDate>{item.time}</HistoryDate>
          </HistoryCard>
        ))}
      </ScrollView>
    </Container>
  );
}