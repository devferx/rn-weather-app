import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Formulario = ({busqueda, setBusqueda}) => {
  const {pais, ciudad} = busqueda;
  const [animacionBoton] = useState(new Animated.Value(1));

  const consultarClima = () => {
    if (pais.trim() === '' || ciudad.trim() === '') {
      mostrarAlerta();
      return;
    }
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Agrega una ciudad y pais para la busqueda', [
      {text: 'Entendido'},
    ]);
  };

  const animacionEntrada = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.75,
      useNativeDriver: true,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionBoton}],
  };

  return (
    <View style={styles.formulario}>
      <View>
        <TextInput
          style={styles.input}
          value={ciudad}
          onChangeText={(ciudad) => setBusqueda({...busqueda, ciudad})}
          placeholder="Ciudad"
          placeholderTextColor="#666"
        />
      </View>
      <View>
        <Picker
          selectedValue={pais}
          itemStyle={{height: 120, backgroundColor: '#FFF'}}
          onValueChange={(pais) => setBusqueda({...busqueda, pais})}>
          <Picker.Item label="-- Seleccione un país --" value="" />
          <Picker.Item label="Estados Unidos" value="US" />
          <Picker.Item label="Bolivia" value="BO" />
          <Picker.Item label="Argentina" value="AR" />
          <Picker.Item label="México" value="MX" />
          <Picker.Item label="Colombia" value="CO" />
          <Picker.Item label="Costa Rica" value="CR" />
          <Picker.Item label="Peru" value="PE" />
        </Picker>
      </View>

      <TouchableWithoutFeedback
        onPressIn={() => animacionEntrada()}
        onPress={() => consultarClima()}
        onPressOut={() => animacionSalida()}>
        <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
          <Text style={styles.textoBuscar}>Buscar Clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Formulario;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});
