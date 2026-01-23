import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, EmptyState } from '../../components/CommonComponents';
import { lawAPI } from '../../utils/api';

export default function LawsScreen() {
  const [laws, setLaws] = useState<any[]>([]);
  const [filteredLaws, setFilteredLaws] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Consumer Law', 'Citizen Rights', 'Housing', 'Tenant Rights'];

  const categoryIcons: any = {
    'Consumer Law': 'cart',
    'Citizen Rights': 'shield-checkmark',
    'Housing': 'home',
    'Tenant Rights': 'people',
    'All': 'apps'
  };

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
      <LinearGradient colors={[Colors.secondary, Colors.secondaryDark]} style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={require('../../assets/logo.jpg')} style={styles.logoSmall} resizeMode="contain" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Laws & Schemes</Text>
            <Text style={styles.headerSubtitle}>Explore legal information</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput style={styles.searchInput} placeholder="Search laws, schemes, rights..." placeholderTextColor={Colors.gray400} value={searchQuery} onChangeText={setSearchQuery} />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer} contentContainerStyle={styles.categoriesContent}>
        {categories.map((category) => (
          <TouchableOpacity key={category} style={[styles.categoryChip, selectedCategory === category && styles.categoryChipActive]} onPress={() => setSelectedCategory(category)} activeOpacity={0.7}>
            <Ionicons name={categoryIcons[category] || 'apps'} size={16} color={selectedCategory === category ? '#FFFFFF' : Colors.text} />
            <Text style={[styles.categoryChipText, selectedCategory === category && styles.categoryChipTextActive]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading laws...</Text>
        </View>
      ) : filteredLaws.length === 0 ? (
        <EmptyState icon="book-outline" title="No laws found" subtitle="Try adjusting your search or filters" />
      ) : (
        <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} tintColor={Colors.primary} />}>
          {filteredLaws.map((law, index) => (
            <TouchableOpacity key={index} activeOpacity={0.9}>
              <Card style={styles.lawCard}>
                <View style={styles.lawHeader}>
                  <LinearGradient colors={[getCategoryColor(law.category) + '20', getCategoryColor(law.category) + '10']} style={styles.lawIconGradient}>
                    <Ionicons name="document-text" size={24} color={getCategoryColor(law.category)} />
                  </LinearGradient>
                  <View style={styles.lawInfo}>
                    <Text style={styles.lawTitle} numberOfLines={2}>{law.title}</Text>
                    <View style={styles.lawMeta}>
                      <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(law.category) + '20' }]}>
                        <Ionicons name={categoryIcons[law.category] || 'apps'} size={12} color={getCategoryColor(law.category)} style={{ marginRight: 4 }} />
                        <Text style={[styles.categoryBadgeText, { color: getCategoryColor(law.category) }]}>{law.category}</Text>
                      </View>
                      {law.state && <Text style={styles.stateText}>• {law.state}</Text>}
                    </View>
                  </View>
                </View>
                <Text style={styles.lawDescription} numberOfLines={3}>{law.description}</Text>
                <View style={styles.lawFooter}>
                  <TouchableOpacity style={styles.learnMoreButton}>
                    <Text style={styles.learnMoreText}>Learn more</Text>
                    <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
          <View style={{ height: 80 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  logoSmall: { width: 48, height: 48, marginRight: 12, borderRadius: 24, backgroundColor: '#FFFFFF' },
  headerText: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 14, color: '#FFFFFF', opacity: 0.9, marginTop: 2 },
  searchContainer: { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: Colors.background },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, borderWidth: 2, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  searchInput: { flex: 1, fontSize: 15, color: Colors.text, marginLeft: 12, fontWeight: '500' },
  categoriesContainer: { maxHeight: 56 },
  categoriesContent: { paddingHorizontal: 20, paddingBottom: 16 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: Colors.surface, borderWidth: 2, borderColor: Colors.border, marginRight: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  categoryChipActive: { backgroundColor: Colors.secondary, borderColor: Colors.secondary, shadowColor: Colors.secondary, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
  categoryChipText: { fontSize: 14, color: Colors.text, marginLeft: 6, fontWeight: '600' },
  categoryChipTextActive: { color: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 14, color: Colors.textSecondary },
  lawCard: { marginBottom: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  lawHeader: { flexDirection: 'row', marginBottom: 14 },
  lawIconGradient: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  lawInfo: { flex: 1 },
  lawTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 8, lineHeight: 22, letterSpacing: -0.3 },
  lawMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  categoryBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginRight: 8 },
  categoryBadgeText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.2 },
  stateText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '500' },
  lawDescription: { fontSize: 14, color: Colors.text, lineHeight: 21, marginBottom: 14, opacity: 0.8 },
  lawFooter: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 14 },
  learnMoreButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  learnMoreText: { fontSize: 14, fontWeight: '700', color: Colors.primary, marginRight: 6, letterSpacing: -0.2 },
});
