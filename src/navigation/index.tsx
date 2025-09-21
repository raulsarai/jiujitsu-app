

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
import { UserData } from '../types/user';

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Profile: undefined;
  EditProfile: { user: UserData };
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
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Profile" component={ProfileScreen} /> 
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{ 
            presentation: 'transparentModal' ,
            animation: 'slide_from_bottom',
          }} 
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}