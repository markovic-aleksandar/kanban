import { COLLECTION_BOARDS_ID, COLLECTION_COLUMNS_ID, COLLECTION_TASKS_ID } from '../appwriteConfig';
import { getDocuments, addDocument } from '../api/database';
import { 
  SET_BOARDS,
  ADD_BOARD,
  UPDATE_BOARD,
  SET_CURRENT_BOARD
} from '../store/slices/boardSlice';
import { 
  showSidebar,
  showLoader, 
  hideLoader 
} from './global';
import { getColumns, addColumns, manageColumns } from './column';
import { addToStorage } from '../utils/index';

// set boards
export const setBoards = async dispatch => {
  // show global loader
  showLoader(dispatch);

  // get all boards
  const boards = await getDocuments(COLLECTION_BOARDS_ID);
  
  // check if the boards have items
  if (boards.length > 0) {
    // check for the current board inside local storage otherwise use the first board from a list
    const currentBoard = {...boards[0]};
    
    // set boards
    dispatch(SET_BOARDS(boards));
    // set current board
    await setCurrentBoard(dispatch, currentBoard);
  }

  // show sidebar
  showSidebar(dispatch);
  // hide loader
  hideLoader(dispatch);
}

// set current board
const setCurrentBoard = async (dispatch, currentBoard) => {
  // get columns for the current board
  currentBoard.columns = await getColumns(currentBoard.$id);

  // set current board (state)
  dispatch(SET_CURRENT_BOARD(currentBoard));
  // set current board id (local storage)
  addToStorage('current-board-id', currentBoard.$id);
}

// add new board
export const addNewBoard = async (dispatch, data) => { 
  const {name, columns} = data;

  // add board to db
  const addedBoard = await addDocument(COLLECTION_BOARDS_ID, {name: name.value});

  // add columns to db and add currentBoard
  addedBoard.columns = await manageColumns(addedBoard.$id, columns.value);

  // setup state
  dispatch(ADD_BOARD(addedBoard));
  dispatch(SET_CURRENT_BOARD(addedBoard));
}