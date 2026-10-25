import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@rahatye_meals';

export async function getMeals() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function saveMeal(meal) {
  const meals = await getMeals();
  meals.unshift(meal); // en yeni en başa
  await AsyncStorage.setItem(KEY, JSON.stringify(meals));
}

export async function markAsSynced(id) {
  const meals = await getMeals();
  const updated = meals.map((m) => (m.id === id ? { ...m, synced: true } : m));
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
}