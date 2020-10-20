import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {act} from 'react-test-renderer';
import Clima from './components/Clima';
import Formulario from './components/Formulario';

const App = () => {
  const [busqueda, setBusqueda] = useState({ciudad: '', pais: ''});
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgColor, setBgColor] = useState('rgb(71,149,219)');

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const apiKey = '143d27d3f9e4b91762766cf08f383acc';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

        try {
          const respuesta = await fetch(url);
          const resultadoApi = await respuesta.json();
          setResultado(resultadoApi);
          setConsultar(false);

          // Modifica los colores de fondo basados en la temperatura
          const kelvin = 273.15;
          const {main} = resultado;
          const actual = main.temp - kelvin;
          if (actual < 10) {
            setBgColor('rgb(105,108,149)');
          } else if (actual >= 10 && actual < 25) {
            setBgColor('rgb(71,149,219)');
          } else {
            setBgColor('rgb(178,28,61)');
          }
        } catch (error) {
          mostrarAlerta();
        }
      }
    };

    consultarClima();
  }, [consultar, ciudad, pais, resultado]);

  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultado intenta con otra ciudad o pais', [
      {text: 'Entendido'},
    ]);
  };

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  return (
    <TouchableWithoutFeedback onPress={ocultarTeclado}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <Clima resultado={resultado} />
          <Formulario
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setConsultar={setConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});
