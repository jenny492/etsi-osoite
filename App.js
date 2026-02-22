import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [address, setAddress] = useState('');
  const defaultCoordinates = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  };
  const [coordinates, setCoordinates] = useState(defaultCoordinates);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setCoordinates(prev => ({
      ...prev,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }));
  }

  useEffect(() => { getCurrentLocation(); }, []);

   const showOnMap = async () => {
    if (!address) {
      return;
    }
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      // tallennetaan koordinaatit tilaan, jotta kartta päivittyy
      setCoordinates(prev => ({
        ...prev,
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
      }))
    } catch (error) {
      console.error('Error fetching geocode data:', error);
    }
  }

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <MapView
        style={{ width: '100%', height: '100%', flex: 1 }}
        region={coordinates}>
        <Marker
          coordinate={coordinates} />
      </MapView>
      <View style={{ paddingBottom: 60, paddingTop: 20, alignContent: 'center', justifyContent: 'center', width: '80%' }}>
        <TextInput
          placeholder="Enter address"
          value={address}
          onChangeText={setAddress}
        />
        <Button title="Show" onPress={showOnMap} />
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
