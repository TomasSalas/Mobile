import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Portuario" component={HomeScreen} />
        <Tab.Screen name="Minero" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}