import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boards: [],
  currentBoard: null
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    SET_BOARDS: (state, action) => {
      state.boards = action.payload;
      // state.boards = [];
    },
    ADD_BOARD: (state, action) => {
      state.boards = [...state.boards, action.payload];
    },
    UPDATE_BOARD: (state, action) => {
      const boardItem = action.payload;
      const updatedBoards = state.boards.map(board => board.$id === boardItem.$id ? boardItem : board);
      state.boards = updatedBoards;
    },
    SET_CURRENT_BOARD: (state, action) => {
      state.currentBoard = action.payload;
    },
    SET_CURRENT_BOARD_COLUMN: (state, action) => {
      const columnItem = action.payload;
      const tempColumns = state.currentBoard.columns.map(column => column.$id === columnItem.$id ? columnItem : column);
      state.currentBoard = {...state.currentBoard, columns: tempColumns};
    },
    SET_CURRENT_BOARD_COLUMNS: (state, action) => {
      state.currentBoard = {...state.currentBoard, columns: action.payload};
    },
    CURRENT_BOARD_UPDATE_COLUMNS: (state, action) => {
      let tempColumns = [...state.currentBoard.columns];
      for (let i = 0; i < action.payload.length; i++) {
        const column = action.payload[i];
        tempColumns = tempColumns.map(tempColumn => tempColumn.$id === column.$id ? column : tempColumn);
      }
      state.currentBoard = {...state.currentBoard, columns: tempColumns};
    }
  }
});

export const {
  SET_BOARDS,
  ADD_BOARD,
  UPDATE_BOARD,
  SET_CURRENT_BOARD,
  SET_CURRENT_BOARD_COLUMN,
  SET_CURRENT_BOARD_COLUMNS,
  CURRENT_BOARD_UPDATE_COLUMNS
} = boardSlice.actions;

export default boardSlice.reducer;