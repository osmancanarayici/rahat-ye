import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMeals } from '../services/storage';

export default function GecmisEkrani() {
  const [meals, setMeals] = useState([]);

  // Ekrana her gelindiğinde listeyi yeniden yükle
  useFocusEffect(
    useCallback(() => {
      getMeals().then(setMeals);
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.sub}>
        {item.category} • {new Date(item.date).toLocaleString('tr-TR')}
      </Text>
      {item.triggers.length > 0 && (
        <Text style={styles.line}>Tetikleyiciler: {item.triggers.join(', ')}</Text>
      )}
      <Text style={styles.line}>
        Rahatsızlık: {item.severity}/5
        {item.symptom ? ` (${item.symptom})` : ''}
      </Text>
      <Text style={styles.sync}>
        {item.synced ? '✅ Sunucuya gönderildi' : '⏳ Sadece telefonda'}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <Text style={styles.empty}>Henüz kayıt yok. İlk yemeğini ekle!</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: { fontSize: 18, fontWeight: '700' },
  sub: { color: '#666', marginTop: 2, marginBottom: 6 },
  line: { marginTop: 2 },
  sync: { marginTop: 8, fontSize: 12, color: '#555' },
  empty: { textAlign: 'center', marginTop: 40, color: '#777' },
});