import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [fecha, setFecha] = useState("");
    const [telefono, setTelefono] = useState("");
    const navigation = useNavigation();

    let ganados = 0;
    let perdidos = 0;

    const handleRegistro = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                correo,
                contrasena
            );
            const user = userCredential.user;

            // Guardar datos en Firestore con el UID como ID del documento
            await setDoc(doc(db, "usuarios", user.uid), {
                uid: user.uid,
                nombre,
                correo,
                fecha,
                telefono,
                ganados,
                perdidos,
            });

            Alert.alert("¡Miau!", "Usuario registrado correctamente 🐾");
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert("Error al registrarse", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.gato}>🐱</Text>
            <Text style={styles.titulo}>Registro CatLover</Text>

            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />
            <TextInput
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
                style={styles.input}
            />
            <TextInput
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Fecha de nacimiento"
                value={fecha}
                onChangeText={setFecha}
                style={styles.input}
            />
            <TextInput
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
                style={styles.input}
            />

            <Button title="Registrarse" onPress={handleRegistro} />
            <View style={{ marginTop: 10 }}>
                <Button
                    title="¿Ya tienes cuenta? Inicia sesión"
                    onPress={() => navigation.navigate("Login")}
                />
            </View>
            <Text style={styles.tematica}>
                ¡Únete a la comunidad de amantes de los gatos y comparte tus mejores
                maullidos!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    gato: { fontSize: 48, textAlign: "center", marginBottom: 10 },
    titulo: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginBottom: 12,
        borderRadius: 6,
    },
    tematica: { marginTop: 20, textAlign: "center", color: "#888" },
});
