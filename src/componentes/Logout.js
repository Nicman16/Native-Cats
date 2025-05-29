import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export default function Logout() {
    useEffect(() => {
        signOut(auth);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginBottom: 16 }}>🐾</Text>
            <Text style={{ fontSize: 18, marginBottom: 16 }}>¡Hasta pronto, CatLover!</Text>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 16, color: '#888' }}>
                Cerrando sesión y guardando tus maullidos...
            </Text>
        </View>
    );
}