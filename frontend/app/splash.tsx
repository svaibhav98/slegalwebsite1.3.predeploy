import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      
      setTimeout(() => {
        if (hasSeenOnboarding === 'true') {
          // User has seen onboarding, go to login
          router.replace('/auth/login');
        } else {
          // First time user, show onboarding
          router.replace('/onboarding');
        }
      }, 2000); // Show splash for 2 seconds
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      router.replace('/onboarding');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <Image 
        source={require('../assets/splash.jpg')} 
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
