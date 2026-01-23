import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
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
      <Stack.Screen options={{ title: 'Lawyers', headerShown: true, headerStyle: { backgroundColor: Colors.background }, headerTintColor: Colors.text }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Consult a Lawyer</Text>
          <Text style={styles.subtitle}>All popular lawyers at one click</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.textSecondary} />
            <TextInput style={styles.searchInput} placeholder="Search lawyers..." value={searchQuery} onChangeText={setSearchQuery} />
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer} contentContainerStyle={styles.filtersContent}>
          {filters.map((filter) => (
            <TouchableOpacity key={filter} style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]} onPress={() => setSelectedFilter(filter)}>
              <Ionicons name="person" size={14} color={selectedFilter === filter ? '#FFFFFF' : Colors.text} />
              <Text style={[styles.filterChipText, selectedFilter === filter && styles.filterChipTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : filteredLawyers.length === 0 ? (
          <EmptyState icon="people-outline" title="No lawyers found" subtitle="Try adjusting your search or filters" />
        ) : (
          <ScrollView style={styles.content}>
            {filteredLawyers.map((lawyer, index) => (
              <LawyerCard key={index} lawyer={lawyer} onPress={() => {}} />
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.primary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  searchContainer: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: Colors.border },
  searchInput: { flex: 1, fontSize: 14, color: Colors.text, marginLeft: 8 },
  filterButton: { width: 48, height: 48, borderRadius: 12, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center' },
  filtersContainer: { maxHeight: 50 },
  filtersContent: { paddingHorizontal: 20, paddingBottom: 12 },
  filterChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, marginRight: 8 },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 13, color: Colors.text, marginLeft: 6 },
  filterChipTextActive: { color: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
