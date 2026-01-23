import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  signOut: () => Promise<void>;
  setMockUser: (phone: string) => Promise<void>;
  setGuestMode: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isGuest: false,
  signOut: async () => {},
  setMockUser: async () => {},
  setGuestMode: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock user object for demo mode
const createMockUser = (phone: string): any => ({
  uid: `mock_${phone}`,
  email: `user${phone}@sunolegal.com`,
  phoneNumber: `+91${phone}`,
  displayName: 'Demo User',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  refreshToken: 'mock_token',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => 'mock_id_token',
  getIdTokenResult: async () => ({ token: 'mock_token', claims: {}, authTime: '', issuedAtTime: '', expirationTime: '', signInProvider: 'phone' }),
  reload: async () => {},
  toJSON: () => ({}),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for mock user in AsyncStorage first
    const checkMockUser = async () => {
      try {
        const mockPhone = await AsyncStorage.getItem('mockUserPhone');
        if (mockPhone) {
          setUser(createMockUser(mockPhone));
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log('AsyncStorage error:', error);
      }
      
      // Fall back to Firebase auth state
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });

      return unsubscribe;
    };

    checkMockUser();
  }, []);

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('mockUserPhone');
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const setMockUser = async (phone: string) => {
    try {
      await AsyncStorage.setItem('mockUserPhone', phone);
      setUser(createMockUser(phone));
    } catch (error) {
      console.error('Error setting mock user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, setMockUser }}>
      {children}
    </AuthContext.Provider>
  );
};
