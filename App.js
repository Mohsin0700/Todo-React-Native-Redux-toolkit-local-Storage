import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import TodoComponent from './src/screens/todoComponent';
const App = () => {
  return (
    <Provider store={store}>
      <View>
        <TodoComponent />
      </View>
    </Provider>
  );
};

export default App;
