import { COLLECTION_BOARDS_ID } from '../appwriteConfig';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../api/database';
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
  // make current board object to be extensible
  currentBoard = {...currentBoard};

  // get columns for the current board
  currentBoard.columns = await getColumns(currentBoard.$id);

  // set current board (state)
  dispatch(SET_CURRENT_BOARD(currentBoard));
  // set current board id (local storage)
  addToStorage('current-board-id', currentBoard.$id);
}

// add new board
export const addNewBoard = async (dispatch, formData) => { 
  const {name, columns: columnsData} = formData;

  // add board to db
  const addedBoard = await addDocument(COLLECTION_BOARDS_ID, {name: name.value});

  // manage columns
  const columns = await manageColumns(columnsData.value, addedBoard.$id);

  // setup state
  dispatch(ADD_BOARD(addedBoard));
  dispatch(SET_CURRENT_BOARD({...addedBoard, columns}));
  switchModal(dispatch);
}

// edit board
export const editBoard = async (dispatch, formData, currentBoard) => {
  const {name, columns: columnsData} = formData;

  // edit board db
  const editedBoard = await updateDocument(COLLECTION_BOARDS_ID, currentBoard.$id, {name: name.value});

  // manage columns
  const columns = await manageColumns(columnsData.value, editedBoard.$id, currentBoard.columns);

  // setup state
  dispatch(UPDATE_BOARD(editedBoard));
  dispatch(SET_CURRENT_BOARD({...editedBoard, columns}));
  switchModal(dispatch);
}

// delete board
export const deleteBoard = async (dispatch, currentBoard, boards) => {
  const {$id, columns} = currentBoard;
  
  // delete board from db
  await deleteDocument(COLLECTION_BOARDS_ID, $id);
  
  // manage columns (delete all columns for current board from db)
  await manageColumns([], false, columns);

  // delete board from boards state
  const newBoards = boards.filter(board => board.$id !== $id);
  dispatch(SET_BOARDS(newBoards));

  // hide delete modal
  switchModal(dispatch);
  
  // change current board
  if (newBoards.length > 0) {
    setCurrentBoard(dispatch, newBoards[0]);
  }
}