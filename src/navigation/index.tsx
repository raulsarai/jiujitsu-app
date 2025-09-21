

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { EvolutionScreen } from '../screens/EvolutionScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { ProfileScreen } from '../screens/ProfileScreen'; 
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { PinVerificationScreen } from '../screens/PinVerificationScreen';
import { SearchEmailScreen } from '../screens/SearchEmailScreen';
import { ContactITScreen } from '../screens/ContactITScreen';
import { UserData } from '../types/user';
import { SpamVerificationScreen } from '../screens/SpamVerificationScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { ScheduleItem } from '../types/schedule';
import { CheckInModal } from '../screens/CheckInModal';


export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  MainTabs: undefined;
  Profile: undefined;
  EditProfile: { user: UserData };
  PinVerification: { email: string };
  SpamVerification: { email: string };
  SearchEmail: { email: string };
  ContactIT: { email: string };
  CheckInModal: { scheduleItem: ScheduleItem };
};


export type TabParamList = {
  Home: undefined;
  Evolution: undefined;
  Schedule: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();


function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.subtext,
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceAlternate, 
          borderTopColor: theme.colors.surfaceAlternate, 
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Evolution') {
            iconName = focused ? 'rocket' : 'rocket-outline';
          } else if (route.name === 'Schedule') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'início' }} />
      <Tab.Screen name="Evolution" component={EvolutionScreen} options={{ tabBarLabel: 'Evolução' }} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ tabBarLabel: 'Agendar' }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" 
        component={RegistrationScreen} 
        options={{ 
            presentation: 'transparentModal' ,
            animation: 'slide_from_bottom',
          }} 
        />
        <Stack.Screen name="PinVerification" component={PinVerificationScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Profile" component={ProfileScreen} 
        options={{ 
            presentation: 'transparentModal' ,
            animation: 'slide_from_bottom',
          }}  /> 
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{ 
            presentation: 'transparentModal' ,
            animation: 'slide_from_bottom',
          }} 
          
        />
        <Stack.Screen
          name="SpamVerification"
          component={SpamVerificationScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="SearchEmail"
          component={SearchEmailScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="ContactIT"
          component={ContactITScreen}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="CheckInModal"
          component={CheckInModal}
          options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}