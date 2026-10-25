import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import KayitEkrani from './src/screens/KayitEkrani';
import GecmisEkrani from './src/screens/GecmisEkrani';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Kayıt"
            component={KayitEkrani}
            options={{ title: 'Rahat Ye' }}
          />
          <Tab.Screen name="Geçmiş" component={GecmisEkrani} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}