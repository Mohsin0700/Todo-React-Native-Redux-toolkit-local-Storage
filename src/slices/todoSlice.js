import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
  try {
    const todos = await AsyncStorage.getItem('todos');
    if (todos) {
      return JSON.parse(todos);
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const saveTodos = createAsyncThunk(
  'todos/saveTodos',
  async (todos, {rejectWithValue}) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        isCompleted: false,
      });
    },
    changeStatus: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(loadTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const {addTodo, changeStatus, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;
