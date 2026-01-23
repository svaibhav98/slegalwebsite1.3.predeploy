import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import { LawyerCard, EmptyState } from '../components/CommonComponents';
import { lawyerAPI } from '../utils/api';

export default function LawyersScreen() {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [filteredLawyers, setFilteredLawyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const router = useRouter();

  const filters = ['All', 'Family Law', 'Corporate Law', 'Property Law', 'Criminal Law'];

  useEffect(() => {
    loadLawyers();
  }, []);

  useEffect(() => {
    filterLawyers();
  }, [searchQuery, selectedFilter, lawyers]);

  const loadLawyers = async () => {
    try {
      const response = await lawyerAPI.listLawyers();
      setLawyers(response.lawyers || []);
    } catch (error) {
      console.error('Error loading lawyers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLawyers = () => {
    let filtered = lawyers;
    
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(lawyer => 
        lawyer.specialization && lawyer.specialization.includes(selectedFilter)
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(lawyer => 
        lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lawyer.specialization?.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredLawyers(filtered);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <LinearGradient colors={[Colors.secondary, Colors.secondaryDark]} style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.8}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Image source={require('../assets/logo.jpg')} style={styles.logoSmall} resizeMode="contain" />
          </View>
          <Text style={styles.title}>Consult a Lawyer</Text>
          <Text style={styles.subtitle}>Connect with verified legal experts</Text>
        </LinearGradient>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color={Colors.textSecondary} />
              <TextInput style={styles.searchInput} placeholder="Search by name or specialization" placeholderTextColor={Colors.gray400} value={searchQuery} onChangeText={setSearchQuery} />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
              ) : null}
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer} contentContainerStyle={styles.filtersContent}>
          {filters.map((filter) => (
            <TouchableOpacity key={filter} style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]} onPress={() => setSelectedFilter(filter)} activeOpacity={0.7}>
              <Ionicons name="briefcase" size={14} color={selectedFilter === filter ? '#FFFFFF' : Colors.text} />
              <Text style={[styles.filterChipText, selectedFilter === filter && styles.filterChipTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Finding lawyers...</Text>
          </View>
        ) : filteredLawyers.length === 0 ? (
          <EmptyState icon="people-outline" title="No lawyers found" subtitle="Try adjusting your search or filters" />
        ) : (
          <ScrollView style={styles.content}>
            {filteredLawyers.map((lawyer, index) => (
              <LawyerCard key={index} lawyer={lawyer} onPress={() => {}} />
            ))}
            <View style={{ height: 80 }} />
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 50, paddingBottom: 24, paddingHorizontal: 20 },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  logoSmall: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF' },
  title: { fontSize: 26, fontWeight: '700', color: '#FFFFFF', marginBottom: 6, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#FFFFFF', opacity: 0.9 },
  searchSection: { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: Colors.background },
  searchContainer: { flexDirection: 'row', gap: 10 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, borderWidth: 2, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  searchInput: { flex: 1, fontSize: 15, color: Colors.text, marginLeft: 12, fontWeight: '500' },
  filterButton: { width: 52, height: 52, borderRadius: 14, backgroundColor: Colors.surface, borderWidth: 2, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  filtersContainer: { maxHeight: 56 },
  filtersContent: { paddingHorizontal: 20, paddingBottom: 16 },
  filterChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: Colors.surface, borderWidth: 2, borderColor: Colors.border, marginRight: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  filterChipActive: { backgroundColor: Colors.secondary, borderColor: Colors.secondary, shadowColor: Colors.secondary, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
  filterChipText: { fontSize: 13, color: Colors.text, marginLeft: 6, fontWeight: '600' },
  filterChipTextActive: { color: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 14, color: Colors.textSecondary },
});
