import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, correo, contrasena);
            // El usuario será redirigido automáticamente por el observer en App.js
        } catch (error) {
            Alert.alert('Error al iniciar sesión', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.gato}>🐱</Text>
            <Text style={styles.titulo}>Iniciar Sesión CatLover</Text>

            <TextInput
                placeholder="Correo electrónico"
                value={correo}
                onChangeText={setCorreo}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                style={styles.input}
                secureTextEntry
            />

            <Button title="Ingresar" onPress={handleLogin} />
            <View style={{ marginTop: 10 }}>
                <Button
                    title="¿No tienes cuenta? Regístrate"
                    onPress={() => navigation.navigate('Registro')}
                />
            </View>
            <Text style={styles.tematica}>
                ¡Bienvenido a la comunidad de amantes de los gatos! 😺
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    gato: {
        fontSize: 48,
        textAlign: 'center',
        marginBottom: 10,
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 12,
        borderRadius: 6,
    },
    tematica: {
        marginTop: 20,
        textAlign: 'center',
        color: '#888',
    },
});