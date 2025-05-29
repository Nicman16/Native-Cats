import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Perfil() {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cargando, setCargando] = useState(true);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;
    const traerDatos = async () => {
      try {
        const docRef = doc(db, 'usuarios', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || '');
          setFecha(data.fecha || '');
          setTelefono(data.telefono || '');
        } else {
          Alert.alert('Usuario no encontrado');
        }
      } catch (error) {
        Alert.alert('Error al cargar datos');
      }
      setCargando(false);
    };
    traerDatos();
  }, [uid]);

  const actualizarDatos = async () => {
    try {
      const docRef = doc(db, 'usuarios', uid);
      await updateDoc(docRef, {
        nombre,
        fecha,
        telefono,
      });
      Alert.alert('Datos actualizados', '¡Tus datos felinos han sido guardados! 😺');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al actualizar');
    }
  };

  if (cargando) return <Text style={styles.cargando}>Cargando perfil gatuno...</Text>;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.gato}>🐾</Text>
      <Text style={styles.titulo}>Perfil del CatLover</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha de nacimiento (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <Button title="Guardar cambios" onPress={actualizarDatos} />
      <Text style={styles.tematica}>
        ¡Mantén tu perfil actualizado para más maullidos y ronroneos!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  gato: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  tematica: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
  },
  cargando: {
    marginTop: 50,
    textAlign: 'center',
  },
});