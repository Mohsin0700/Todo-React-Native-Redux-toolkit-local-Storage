import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import store from './app/store';
import TodoComponent from './app/todoComponent';
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
