import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput, Modal, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { caseAPI } from '../../utils/api';

export default function CasesScreen() {
  const router = useRouter();
  const [cases, setCases] = useState<any[]>([]);
  const [filteredCases, setFilteredCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCase, setNewCase] = useState({ title: '', description: '', court: '', case_number: '', hearing_date: '', status: 'upcoming' });

  useEffect(() => {
    loadCases();
  }, []);

  useEffect(() => {
    filterCases();
  }, [searchQuery, cases]);

  const loadCases = async () => {
    try {
      const response = await caseAPI.listCases();
      let fetchedCases = response.cases || [];
      
      if (fetchedCases.length === 0) {
        fetchedCases = [
          { id: '1', title: 'Tenancy Laws Violation', description: 'Dispute with landlord regarding illegal eviction', court: 'Civil Court, Delhi', case_number: 'CC/DL/2024/001', hearing_date: '2025-02-15', status: 'ongoing', icon_color: '#8B5CF6', created_at: '2024-12-01' },
          { id: '2', title: 'Consumer Rights Case', description: 'Product defect complaint against manufacturer', court: 'Consumer Forum, Mumbai', case_number: 'CF/MH/2024/089', hearing_date: '2025-02-20', status: 'upcoming', icon_color: '#3B82F6', created_at: '2024-11-15' },
          { id: '3', title: 'Property Dispute', description: 'Boundary dispute with neighbor', court: 'District Court, Bangalore', case_number: 'DC/KA/2024/234', hearing_date: '2025-02-10', status: 'ongoing', icon_color: '#F59E0B', created_at: '2024-10-20' },
          { id: '4', title: 'Employment Termination', description: 'Wrongful termination compensation claim', court: 'Labour Court, Pune', case_number: 'LC/MH/2023/456', status: 'closed', icon_color: '#10B981', closed_date: '2024-12-01', created_at: '2023-08-10' },
        ];
      }
      setCases(fetchedCases);
      setFilteredCases(fetchedCases);
    } catch (error) {
      console.error('Error loading cases:', error);
      setCases([]);
      setFilteredCases([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterCases = () => {
    if (!searchQuery.trim()) {
      setFilteredCases(cases);
      return;
    }
    
    const filtered = cases.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.case_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.court.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCases(filtered);
  };

  const handleAddCase = async () => {
    if (!newCase.title || !newCase.description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const caseWithId = { 
      ...newCase, 
      id: Date.now().toString(), 
      created_at: new Date().toISOString(), 
      icon_color: '#8B5CF6' 
    };
    setCases([...cases, caseWithId]);
    setShowAddModal(false);
    setNewCase({ title: '', description: '', court: '', case_number: '', hearing_date: '', status: 'upcoming' });
    Alert.alert('Success', 'Case added successfully');
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadCases();
  };

  const getStatusColor = (status: string) => {
    if (status === 'ongoing') return '#10B981';
    if (status === 'upcoming') return '#F59E0B';
    if (status === 'closed') return '#EF4444';
    return '#9CA3AF';
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getOngoingCount = () => cases.filter(c => c.status === 'ongoing').length;
  const getClosedCount = () => cases.filter(c => c.status === 'closed').length;
  const getUpcomingCount = () => cases.filter(c => c.status === 'upcoming').length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Cases</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)} activeOpacity={0.8}>
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search by Case Number or Party Name..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} tintColor={Colors.primary} />}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Ionicons name="stats-chart" size={24} color={Colors.text} />
              <Text style={styles.summaryTitle}>My Cases</Text>
            </View>
            <View style={styles.summaryStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{getOngoingCount()}</Text>
                <Text style={styles.statLabel}>Ongoing</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{getClosedCount()}</Text>
                <Text style={styles.statLabel}>Closed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{getUpcomingCount()}</Text>
                <Text style={styles.statLabel}>Upcoming</Text>
              </View>
            </View>
          </View>

          {filteredCases.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No cases found</Text>
              <Text style={styles.emptySubtitle}>Try adjusting your search or add a new case</Text>
            </View>
          ) : (
            filteredCases.map((caseItem, index) => (
              <TouchableOpacity key={index} style={styles.caseCard} onPress={() => router.push(`/case-detail/${caseItem.id}` as any)} activeOpacity={0.7}>
                <View style={styles.caseContent}>
                  <View style={[styles.caseIconCircle, { backgroundColor: caseItem.icon_color }]}>
                    <Ionicons name="document-text" size={24} color="#FFFFFF" />
                  </View>
                  
                  <View style={styles.caseInfo}>
                    <View style={styles.caseTitleRow}>
                      <Text style={styles.caseTitle} numberOfLines={1}>{caseItem.title}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(caseItem.status) }]}>
                        <Text style={styles.statusText}>{getStatusLabel(caseItem.status)}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.caseDetail}>
                      <Ionicons name="document-outline" size={14} color="#6B7280" />
                      <Text style={styles.caseDetailText}>{caseItem.case_number}</Text>
                    </View>
                    
                    <View style={styles.caseDetail}>
                      <Ionicons name="location-outline" size={14} color="#6B7280" />
                      <Text style={styles.caseDetailText}>{caseItem.court}</Text>
                    </View>
                    
                    {caseItem.hearing_date && (
                      <View style={styles.caseDetail}>
                        <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                        <Text style={styles.caseDetailText}>Next Hearing: {caseItem.hearing_date}</Text>
                      </View>
                    )}
                    
                    {caseItem.status === 'closed' && caseItem.closed_date && (
                      <View style={styles.caseDetail}>
                        <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                        <Text style={[styles.caseDetailText, { color: '#10B981' }]}>Resolved: {caseItem.closed_date}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
          
          <View style={{ height: 100 }} />
        </ScrollView>
      )}

      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Case</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Case Title *</Text>
              <TextInput style={styles.input} placeholder="e.g., Property Dispute" placeholderTextColor="#9CA3AF" value={newCase.title} onChangeText={(text) => setNewCase({ ...newCase, title: text })} />
              
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput style={[styles.input, styles.textArea]} placeholder="Brief description" placeholderTextColor="#9CA3AF" value={newCase.description} onChangeText={(text) => setNewCase({ ...newCase, description: text })} multiline numberOfLines={4} />
              
              <Text style={styles.inputLabel}>Court</Text>
              <TextInput style={styles.input} placeholder="e.g., District Court" placeholderTextColor="#9CA3AF" value={newCase.court} onChangeText={(text) => setNewCase({ ...newCase, court: text })} />
              
              <Text style={styles.inputLabel}>Case Number</Text>
              <TextInput style={styles.input} placeholder="e.g., DC/2024/001" placeholderTextColor="#9CA3AF" value={newCase.case_number} onChangeText={(text) => setNewCase({ ...newCase, case_number: text })} />
              
              <Text style={styles.inputLabel}>Next Hearing Date</Text>
              <TextInput style={styles.input} placeholder="YYYY-MM-DD" placeholderTextColor="#9CA3AF" value={newCase.hearing_date} onChangeText={(text) => setNewCase({ ...newCase, hearing_date: text })} />
              
              <TouchableOpacity style={[styles.submitButton, (!newCase.title || !newCase.description) && styles.submitButtonDisabled]} onPress={handleAddCase} disabled={!newCase.title || !newCase.description} activeOpacity={0.8}>
                <Text style={styles.submitButtonText}>Add Case</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { backgroundColor: '#242B4E', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.5 },
  addButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#353D5E', borderRadius: 12, paddingHorizontal: 16, height: 48 },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 15, color: '#FFFFFF', fontWeight: '400' },
  content: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  summaryCard: { backgroundColor: '#FFFFFF', marginHorizontal: 20, marginTop: 20, borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  summaryTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginLeft: 12, letterSpacing: -0.3 },
  summaryStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 32, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  statLabel: { fontSize: 14, fontWeight: '500', color: '#6B7280' },
  statDivider: { width: 1, height: 40, backgroundColor: '#E5E7EB' },
  caseCard: { backgroundColor: '#FFFFFF', marginHorizontal: 20, marginTop: 16, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  caseContent: { flexDirection: 'row' },
  caseIconCircle: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  caseInfo: { flex: 1 },
  caseTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  caseTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', flex: 1, marginRight: 8, letterSpacing: -0.3 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 0.5 },
  caseDetail: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 6 },
  caseDetailText: { fontSize: 13, color: '#6B7280', fontWeight: '400' },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#4B5563', marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: '#9CA3AF', marginTop: 8, textAlign: 'center', paddingHorizontal: 40 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%', padding: 24 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#1F2937', letterSpacing: -0.5 },
  inputLabel: { fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: '#1F2937', fontWeight: '400' },
  textArea: { height: 100, textAlignVertical: 'top' },
  submitButton: { marginTop: 24, backgroundColor: '#FF6B35', borderRadius: 12, paddingVertical: 16, alignItems: 'center', shadowColor: '#FF6B35', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 },
});
