import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { CATEGORIES, TRIGGERS, SYMPTOMS } from '../constants/options';
import { saveMeal, markAsSynced } from '../services/storage';
import { submitMealToServer } from '../services/fakeApi';

function Chip({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function KayitEkrani() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [triggers, setTriggers] = useState([]);
  const [severity, setSeverity] = useState(1);
  const [symptom, setSymptom] = useState(null);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const nameEmpty = name.trim() === '';

  const toggleTrigger = (t) => {
    setTriggers((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const resetForm = () => {
    setName('');
    setCategory(CATEGORIES[0]);
    setTriggers([]);
    setSeverity(1);
    setSymptom(null);
    setTouched(false);
  };

  const sendToServer = async (entry) => {
    setLoading(true);
    try {
      await submitMealToServer(entry);
      await markAsSynced(entry.id);
      Alert.alert('Başarılı ✅', 'Kaydın sunucuya gönderildi.');
    } catch (e) {
      Alert.alert(
        'Gönderilemedi ❌',
        'Kaydın telefonda güvende. Tekrar denemek ister misin?',
        [
          { text: 'İptal', style: 'cancel' },
          { text: 'Tekrar dene', onPress: () => sendToServer(entry) },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setTouched(true);
    if (nameEmpty) return;

    const entry = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      triggers,
      severity,
      symptom,
      date: new Date().toISOString(),
      synced: false,
    };

    // Önce telefona kaydet (internet olmasa da veri kaybolmasın)
    await saveMeal(entry);
    resetForm();
    // Sonra sahte sunucuya gönder
    await sendToServer(entry);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Yemeğin adı</Text>
      <TextInput
        style={[styles.input, touched && nameEmpty && styles.inputError]}
        value={name}
        onChangeText={setName}
        onBlur={() => setTouched(true)}
        placeholder="Örn: Mercimek çorbası"
      />
      {touched && nameEmpty && (
        <Text style={styles.errorText}>Yemek adı boş bırakılamaz.</Text>
      )}

      <Text style={styles.label}>Kategori</Text>
      <View style={styles.row}>
        {CATEGORIES.map((c) => (
          <Chip
            key={c}
            label={c}
            selected={category === c}
            onPress={() => setCategory(c)}
          />
        ))}
      </View>

      <Text style={styles.label}>İçindeki tetikleyiciler</Text>
      <View style={styles.row}>
        {TRIGGERS.map((t) => (
          <Chip
            key={t}
            label={t}
            selected={triggers.includes(t)}
            onPress={() => toggleTrigger(t)}
          />
        ))}
      </View>

      <Text style={styles.label}>Mide rahatsızlığı (1 = hafif, 5 = çok şiddetli)</Text>
      <View style={styles.row}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Chip
            key={n}
            label={String(n)}
            selected={severity === n}
            onPress={() => setSeverity(n)}
          />
        ))}
      </View>

      <Text style={styles.label}>Şikayet tipi</Text>
      <View style={styles.row}>
        {SYMPTOMS.map((s) => (
          <Chip
            key={s}
            label={s}
            selected={symptom === s}
            onPress={() => setSymptom(symptom === s ? null : s)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, (nameEmpty || loading) && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={nameEmpty || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Gönder</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 18, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: '#d32f2f' },
  errorText: { color: '#d32f2f', marginTop: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  chipSelected: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  chipText: { color: '#333' },
  chipTextSelected: { color: '#fff', fontWeight: '600' },
  button: {
    backgroundColor: '#2e7d32',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonDisabled: { backgroundColor: '#a5a5a5' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
//