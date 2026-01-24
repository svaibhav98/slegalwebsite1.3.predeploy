import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary, 
        tabBarInactiveTintColor: Colors.gray400,
        tabBarShowLabel: false,
        
        // Fixed tab bar style - no extra padding
        tabBarStyle: { 
          backgroundColor: Colors.background, 
          borderTopColor: Colors.border, 
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 50 : 56,
          paddingBottom: 0,
          paddingTop: 0,
        },
        
        // Center icons vertically
        tabBarItemStyle: {
          paddingVertical: Platform.OS === 'ios' ? 6 : 8,
        },
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="laws" 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="chat" 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="sparkles" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="cases" 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="folder" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="documents" 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} /> 
        }} 
      />
    </Tabs>
  );
}
