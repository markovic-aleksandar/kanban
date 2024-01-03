import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import boardReducer from './slices/boardSlice';

const store = configureStore({
  reducer: {
    global: globalReducer,
    board: boardReducer
  }
});

export default store;