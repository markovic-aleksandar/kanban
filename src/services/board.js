import { COLLECTION_BOARDS_ID, COLLECTION_COLUMNS_ID, COLLECTION_TASKS_ID } from '../appwriteConfig';
import { getDocuments } from '../api/database';
import { 
  SET_BOARDS,
  ADD_BOARD,
  UPDATE_BOARD,
  SET_CURRENT_BOARD
} from '../store/slices/boardSlice';
import { addToStorage } from '../utils/index';

// set boards
export const setBoards = async dispatch => {
  // get all boards
  const boards = await getDocuments(COLLECTION_BOARDS_ID);
  
  // check if the boards have items
  if (boards.length > 0) {
    // check for the current board inside local storage otherwise use the first board from a list
    const currentBoard = {...boards[0]};
    
    // set boards (state)
    dispatch(SET_BOARDS(boards));
    await setCurrentBoard(dispatch, currentBoard);
  }
}

// set current board
const setCurrentBoard = async (dispatch, currentBoard) => {
  // get columns for the current board
  currentBoard.columns = await getBoardColumns(currentBoard);
  

  // set current board(state)
  dispatch(SET_CURRENT_BOARD(currentBoard));
  // set current board (local storage)
  addToStorage('current-board', currentBoard);
}

// get current board columns
const getBoardColumns = async board => {
  // get all columns for specific board
  const columnsQueryOptions = { equal: ['boardId', [board.$id]] }
  let columns = await getDocuments(COLLECTION_COLUMNS_ID, columnsQueryOptions);

  // get all tasks for all columns  
  columns = await Promise.all(columns.map(async column => {
    const taskQueryOptions = { equal: ['columnId', [column.$id]] };
    const columnTasks = await getDocuments(COLLECTION_TASKS_ID, taskQueryOptions);

    return {...column, tasks: columnTasks};
  }));

  return columns;
}

  // -- takodje mozda je dobro da posto ako nemamo board-ove onda nemamo ni sidebar sto mislim da je dobro npr. tok cekamo board-ove da sidebar bude skriven i kada stignu podaci da se prikaze da ne bismo imali vise loader-a vec samo onaj jedan na sredini