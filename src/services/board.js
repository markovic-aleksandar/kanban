import { COLLECTION_BOARDS_ID } from '../appwriteConfig';
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
import { getColumns, manageColumns } from './column';
import { switchModal } from './modal';
import { getFromStorage, addToStorage } from '../utils/index';

// set boards
export const setBoards = async dispatch => {
  // show global loader
  showLoader(dispatch);

  // get all boards
  const boards = await getDocuments(COLLECTION_BOARDS_ID);
  
  // check if the boards have items
  if (boards.length > 0) {
    // set current board based on id from local storage or boards first element
    const currentBoardIdStorage = getFromStorage('current-board-id');
    const boardFromStorage = boards.find(boardItem => boardItem.$id === currentBoardIdStorage);
    const currentBoard = boardFromStorage ? {...boardFromStorage} : {...boards[0]};

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
  addedBoard.columns = await manageColumns(columns.value, addedBoard.$id);

  // setup state
  dispatch(ADD_BOARD(addedBoard));
  dispatch(SET_CURRENT_BOARD(addedBoard));
  switchModal(dispatch);
}