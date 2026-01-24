import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarActiveTintColor: Colors.primary, 
      tabBarInactiveTintColor: Colors.gray400, 
      tabBarStyle: { 
        backgroundColor: Colors.background, 
        borderTopColor: Colors.border, 
        borderTopWidth: 1, 
        height: 56, 
        paddingBottom: 4, 
        paddingTop: 8 
      },
      tabBarShowLabel: false
    }}>
      <Tabs.Screen name="home" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
      <Tabs.Screen name="laws" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} /> }} />
      <Tabs.Screen name="chat" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="sparkles" size={size} color={color} /> }} />
      <Tabs.Screen name="cases" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="folder" size={size} color={color} /> }} />
      <Tabs.Screen name="documents" options={{ tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} /> }} />
    </Tabs>
  );
}
