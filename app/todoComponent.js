import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodo,
  changeStatus,
  removeTodo,
  loadTodos,
  saveTodos,
} from './todoSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoComponent = () => {
  const [todoText, setTodoText] = useState('');

  const todos = useSelector(state => state.todos.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(saveTodos(todos));
  }, [todos, dispatch]);

  const handleAddTodo = () => {
    if (todoText.trim()) {
      dispatch(addTodo(todoText));
      setTodoText('');
    }
  };

  const handlechangeStatus = id => {
    dispatch(changeStatus(id));
  };

  const handleRemoveTodo = id => {
    dispatch(removeTodo(id));
  };

  return (
    <View style={Styles.container}>
      <TextInput
        placeholder="Enter todo"
        value={todoText}
        onChangeText={setTodoText}
        style={{borderWidth: 1, padding: 10, margin: 10}}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
            <TouchableOpacity onPress={() => handlechangeStatus(item.id)}>
              <Text style={{marginRight: 10}}>
                {item.isCompleted ? (
                  <Icon name="check-circle" size={30} color="green" />
                ) : (
                  <Icon name="radio-button-unchecked" size={30} color="green" />
                )}
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                {
                  textDecorationLine: item.isCompleted
                    ? 'line-through'
                    : 'none',
                },
                Styles.todo,
              ]}>
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
              <Icon name="delete" size={30} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default TodoComponent;

const Styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  todo: {
    flex: 1,
    fontSize: 24,
    marginRight: 10,
  },
});
