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
import { getFromStorage, addToStorage, delayToHandle } from '../utils';

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
    const isExistStorageBoardId = boards.find(board => board.$id === currentBoardIdStorage);
    const currentBoardId = isExistStorageBoardId ? currentBoardIdStorage : boards[0].$id;

    // set boards state
    dispatch(SET_BOARDS(boards));
    // set current board
    await setCurrentBoard(dispatch, boards, currentBoardId);
  }

  // show sidebar
  showSidebar(dispatch);

  // hide loader
  hideLoader(dispatch);
}

// set current board
const setCurrentBoard = async (dispatch, boards, currentBoardId) => {
  // get current board by id
  const currentBoard = {...boards.find(board => board.$id === currentBoardId)};

  // get columns for the current board
  currentBoard.columns = await getColumns(currentBoard.$id);

  // set current board (state)
  dispatch(SET_CURRENT_BOARD(currentBoard));

  // set current board id (local storage)
  addToStorage('current-board-id', currentBoard.$id);
}

// change current board
export const changeCurrentBoard = async (dispatch, boards, currentBoardId) => {
  // show global loader
  showLoader(dispatch);

  // set current board
  await setCurrentBoard(dispatch, boards, currentBoardId);

  // hide loader
  hideLoader(dispatch);
}

// add new board
export const addNewBoard = async (hooks, formData) => {
  const {dispatch, setLoading} = hooks;
  const {name, columns: columnsData} = formData;

  // show loading
  setLoading(true);

  // add board to db
  const addedBoard = await addDocument(COLLECTION_BOARDS_ID, {name: name.value});

  // manage columns
  const columns = await manageColumns(columnsData.value, addedBoard.$id);

  // add board state
  dispatch(ADD_BOARD(addedBoard));
  // set current board state
  dispatch(SET_CURRENT_BOARD({...addedBoard, columns}));
  
  // hide modal
  switchModal(dispatch);

  // set current board id (local storage)
  addToStorage('current-board-id', addedBoard.$id);

  // hide loading
  delayToHandle(() => setLoading(false), 300);
}

// edit board
export const editBoard = async (hooks, formData, currentBoard) => {
  const {dispatch, setLoading} = hooks;
  const {name, columns: columnsData} = formData;

  // show loading
  setLoading(true);

  // edit board db
  const editedBoard = await updateDocument(COLLECTION_BOARDS_ID, currentBoard.$id, {name: name.value});

  // manage columns
  const columns = await manageColumns(columnsData.value, editedBoard.$id, currentBoard.columns);

  // update board state
  dispatch(UPDATE_BOARD(editedBoard));
  // set current board state
  dispatch(SET_CURRENT_BOARD({...editedBoard, columns}));
  
  // hide modal
  switchModal(dispatch);

  // hide loading
  delayToHandle(() => setLoading(false), 300);
}

// delete board
export const deleteBoard = async (hooks, currentBoard, boards) => {
  const {dispatch, setLoading} = hooks;
  const {$id, columns} = currentBoard;
  
  // show loading
  setLoading(true);

  // delete board from db
  await deleteDocument(COLLECTION_BOARDS_ID, $id);
  
  // manage columns (delete all columns for current board from db)
  await manageColumns([], false, columns);

  // delete board from boards state
  const newBoards = boards.filter(board => board.$id !== $id);
  dispatch(SET_BOARDS(newBoards));

  // hide modal
  switchModal(dispatch);
  
  // change current board
  if (newBoards.length > 0) {
    setCurrentBoard(dispatch, newBoards, newBoards[0].$id);
  }

  // hide loading
  delayToHandle(() => setLoading(false), 300);
}