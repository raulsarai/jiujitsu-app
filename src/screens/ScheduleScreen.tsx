

import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { DayChip } from '../components/DayChip';
import { TimeSlotCard } from '../components/TimeSlotCard';

const weekDays = ['Sábado', 'Domingo', 'Segunda', 'Terça', 'Quarta'];
type ScheduleStatus = 'available' | 'checked-in';

interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  type: string;
  status: ScheduleStatus;
}

const scheduleData: ScheduleItem[] = [
  { id: '1', day: 'Sábado', time: '14h → 15h', type: 'Infantil', status: 'available' },
  { id: '2', day: 'Sábado', time: '15h → 16:30', type: 'Adulto', status: 'available' },
  { id: '3', day: 'Sábado', time: '15h → 16:30', type: 'Adulto', status: 'checked-in' },
  { id: '4', day: 'Segunda', time: '19h → 20:30', type: 'Adulto', status: 'available' },
  { id: '5', day: 'Terça', time: '20h → 21:30', type: 'Adulto', status: 'available' },
];


const Container = styled(SafeAreaView)(({ theme }: { theme: DefaultTheme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  paddingTop: theme.spacings.xxlarge,
}));

const Header = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  padding: theme.spacings.medium,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.surface,
}));

const Title = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 28,
  fontWeight: 'bold',
}));

const Section = styled.View(({ theme }: { theme: DefaultTheme }) => ({
  paddingHorizontal: theme.spacings.medium,
  marginTop: theme.spacings.large,
}));

const SectionTitle = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.subtext,
  fontSize: theme.fonts.sizes.medium,
  marginBottom: theme.spacings.medium,
}));

// --- Tela Principal ---
export function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState('Sábado');

  const filteredSchedule = scheduleData.filter(item => item.day === selectedDay);

  return (
    <Container>
      <Header>
        <Title>Jiu Jitsu</Title>
      </Header>
      <ScrollView>
        <Section>
          <SectionTitle>Selecione o dia</SectionTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {weekDays.map(day => (
              <DayChip
                key={day}
                label={day}
                isActive={selectedDay === day}
                onPress={() => setSelectedDay(day)}
              />
            ))}
          </ScrollView>
        </Section>
        
        <Section>
          <SectionTitle>Selecione o horário</SectionTitle>
          {filteredSchedule.map(item => (
            <TimeSlotCard
              key={item.id}
              time={item.time}
              type={item.type}
              status={item.status}
            />
          ))}
        </Section>
      </ScrollView>
    </Container>
  );
}