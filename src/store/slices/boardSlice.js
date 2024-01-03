import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boards: [],
  currentBoard: null
};

// current board - sto se ovoga tice ja mislim da je najbolje da imamo jedan current board koji ce da sadrzi svoje columns a ti columns taskove koji ce imati sub-taskove tako da bi trebalo za svaku akciju koja ce ovde biti moguca kreirati ovaj reducers actions 

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    SET_BOARDS: (state, action) => {
      state.boards = action.payload;
    },
    ADD_BOARD: (state, action) => {
      state.boards = [...state.boards, action.payload];
    },
    UPDATE_BOARD: (state, action) => {
      const {boardId, boardItem} = action.payload;
      const updatedBoards = state.boards.map(board => board.id === boardId ? boardItem : board);
      state.boards = updatedBoards;
    },
    DELETE_BOARD: (state, action) => {
      const deletedBoards = state.boards.filter(board => board.id !== action.payload);
      state.boards = deletedBoards;
    },
    SET_CURRENT_BOARD: (state, action) => {
      state.currentBoard = action.payload;
    }
  }
});

export const {
  SET_BOARDS,
  ADD_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  SET_CURRENT_BOARD
} = boardSlice.actions;

export default boardSlice.reducer;