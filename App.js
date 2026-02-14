// ehkä tämä jos ehtii: https://kirillzyusko.github.io/react-native-keyboard-controller/docs/installation

import { Button, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

export default function App() {

  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(60.200692);
  const [longitude, setLongitude] = useState(24.934302);

  const coordinates = {
    latitude: Number(latitude),
    longitude: Number(longitude),
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
};
  
  const showOnMap = () => {

  }

  return (
    <View style={styles.container}>
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
    </View>
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
