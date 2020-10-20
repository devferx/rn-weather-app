import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import Formulario from './components/Formulario';

const App = () => {
  const [busqueda, setBusqueda] = useState({ciudad: '', pais: ''});
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});

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
        } catch (error) {
          mostrarAlerta();
        }
      }
    };

    consultarClima();
  }, [consultar, ciudad, pais]);

  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultado intenta con otra ciudad o pais', [
      {text: 'Entendido'},
    ]);
  };

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={ocultarTeclado}>
      <View style={styles.app}>
        <View style={styles.contenido}>
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
    backgroundColor: 'rgb(71,149,219)',
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});
