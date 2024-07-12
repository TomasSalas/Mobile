import React, { useState } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Keychain from 'react-native-keychain';
import { FormatRut } from '../helpers/FormatRut';


export default function LoginScreen({ onLogin }) {
  const [rut, setRut] = useState('');
  const [formattedRut, setFormattedRut] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://your-api-endpoint.com/login', {
        rut,
        password,
      });
      const { token } = response.data;
      await Keychain.setGenericPassword('accessToken', token);
      onLogin();
    } catch (error) {
      alert('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };


  return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/logot.png')} style={styles.logo} />
        <TextInput
          mode="outlined"
          label="RUT"
          value={rut}
          onChangeText={setRut}
          style={styles.input}
          maxLength={12}
        />
        <TextInput
          mode="outlined"
          label="Clave"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" buttonColor='#db0101' onPress={handleLogin} loading={loading}>
          Iniciar Sesión
        </Button>
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    width: '100%',
    marginVertical: 10,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
});