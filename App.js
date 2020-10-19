import React from 'react';
import {StyleSheet, View} from 'react-native';
import Formulario from './components/Formulario';

const App = () => {
  return (
    <View style={styles.app}>
      <View style={styles.contenido}>
        <Formulario />
      </View>
    </View>
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
