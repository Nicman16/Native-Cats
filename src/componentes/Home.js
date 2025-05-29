import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';

export default function Home() {
  const [gatos, setGatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerGatos = async () => {
      try {
        const res = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=20&has_breeds=1",
          {
            headers: {
              "x-api-key": "live_oVDpvnytVycUgVqf5IgjKjy3kZbl4Z8IZdISk52aVHgHYter39RXM2YVPtbdKGvH"
            }
          }
        );
        const json = await res.json();
        setGatos(json);
      } catch (error) {
        setGatos([]);
      } finally {
        setCargando(false);
      }
    };

    obtenerGatos();
  }, []);

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Cargando gatitos...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.lista}>
        {gatos.map((gato, index) => (
          <View key={gato.id || index} style={styles.item}>
            <Text style={styles.nombre}>
              {gato.breeds && gato.breeds[0] ? gato.breeds[0].name : "Gato sin raza"}
            </Text>
            <Image
              source={{ uri: gato.url }}
              style={styles.imagen}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'space-between',
    padding: 10,
  },
  item: {
    backgroundColor: '#f5f5dc',
    width: '48%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  nombre: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#444',
  },
  imagen: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});