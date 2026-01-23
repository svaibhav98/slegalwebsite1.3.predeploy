import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Header, Card, EmptyState } from '../../components/CommonComponents';
import { lawAPI } from '../../utils/api';

export default function LawsScreen() {
  const [laws, setLaws] = useState<any[]>([]);
  const [filteredLaws, setFilteredLaws] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Consumer Law', 'Citizen Rights', 'Housing', 'Tenant Rights'];

  useEffect(() => {
    loadLaws();
  }, []);

  useEffect(() => {
    filterLaws();
  }, [searchQuery, selectedCategory, laws]);

  const loadLaws = async () => {
    try {
      const response = await lawAPI.listLaws();
      setLaws(response.laws || []);
    } catch (error) {
      console.error('Error loading laws:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterLaws = () => {
    let filtered = laws;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(law => law.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(law => 
        law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredLaws(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadLaws();
  };

  const getCategoryColor = (category: string) => {
    const colors: any = {
      'Consumer Law': Colors.primary,
      'Citizen Rights': Colors.info,
      'Housing': Colors.success,
      'Tenant Rights': Colors.warning,
    };
    return colors[category] || Colors.secondary;
  };

  return (
    <View style={styles.container}>
      <Header title="Laws & Govt. Schemes" subtitle="Explore key laws and government schemes" />

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput style={styles.searchInput} placeholder="Search laws & schemes..." value={searchQuery} onChangeText={setSearchQuery} />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer} contentContainerStyle={styles.categoriesContent}>
        {categories.map((category) => (
          <TouchableOpacity key={category} style={[styles.categoryChip, selectedCategory === category && styles.categoryChipActive]} onPress={() => setSelectedCategory(category)}>
            <Ionicons name="apps" size={16} color={selectedCategory === category ? '#FFFFFF' : Colors.text} />
            <Text style={[styles.categoryChipText, selectedCategory === category && styles.categoryChipTextActive]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : filteredLaws.length === 0 ? (
        <EmptyState icon="book-outline" title="No laws found" subtitle="Try adjusting your search or filters" />
      ) : (
        <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />}>
          {filteredLaws.map((law, index) => (
            <Card key={index} style={styles.lawCard}>
              <View style={styles.lawHeader}>
                <View style={[styles.lawIcon, { backgroundColor: getCategoryColor(law.category) + '20' }]}>
                  <Ionicons name="document-text" size={24} color={getCategoryColor(law.category)} />
                </View>
                <View style={styles.lawInfo}>
                  <Text style={styles.lawTitle}>{law.title}</Text>
                  <View style={styles.lawMeta}>
                    <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(law.category) + '20' }]}>
                      <Text style={[styles.categoryBadgeText, { color: getCategoryColor(law.category) }]}>{law.category}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={styles.lawDescription}>{law.description}</Text>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn more</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
              </TouchableOpacity>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchContainer: { paddingHorizontal: 20, paddingVertical: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: Colors.border },
  searchInput: { flex: 1, fontSize: 14, color: Colors.text, marginLeft: 8 },
  categoriesContainer: { maxHeight: 50 },
  categoriesContent: { paddingHorizontal: 20, paddingBottom: 12 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, marginRight: 8 },
  categoryChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  categoryChipText: { fontSize: 14, color: Colors.text, marginLeft: 6 },
  categoryChipTextActive: { color: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lawCard: { marginBottom: 16 },
  lawHeader: { flexDirection: 'row', marginBottom: 12 },
  lawIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  lawInfo: { flex: 1 },
  lawTitle: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 6 },
  lawMeta: { flexDirection: 'row', alignItems: 'center' },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  categoryBadgeText: { fontSize: 12, fontWeight: '600' },
  lawDescription: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20, marginBottom: 12 },
  learnMoreButton: { flexDirection: 'row', alignItems: 'center' },
  learnMoreText: { fontSize: 14, fontWeight: '600', color: Colors.primary, marginRight: 4 },
});
