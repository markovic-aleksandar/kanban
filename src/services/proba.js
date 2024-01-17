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
import { addColumns } from './column';
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
    
    // set boards (state)
    dispatch(SET_BOARDS(boards));
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
  currentBoard.columns = await getBoardColumns(currentBoard);
  

  // set current board (state)
  dispatch(SET_CURRENT_BOARD(currentBoard));
  // set current board id (local storage)
  addToStorage('current-board-id', currentBoard.$id);
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

// add (create) new board
export const addBoard = async (dispatch, data) => { 
  const {name, columns} = data;

  const columnsProba = [
    {name: 'coa1', boardId: '321313213123'},
    {name: 'coa3', boardId: '321313213123'},
    {name: 'coa3', boardId: '321313213123'}
  ];

  // create new board to db
  const addedBoard = await addDocument(COLLECTION_BOARDS_ID, {name: name.value, columns: columnsProba});

  console.log(addedBoard);
  // check if created board is exist
  // if (addedBoard) {
  //   // add all columns
  //   addedBoard.columns = await addColumns(addedBoard.$id, columns.value);

  //   dispatch(SET_CURRENT_BOARD(addedBoard));
  // }
}

  // -- takodje mozda je dobro da posto ako nemamo board-ove onda nemamo ni sidebar sto mislim da je dobro npr. tok cekamo board-ove da sidebar bude skriven i kada stignu podaci da se prikaze da ne bismo imali vise loader-a vec samo onaj jedan na sredini


  import { COLLECTION_COLUMNS_ID } from '../appwriteConfig';
import { addDocument } from '../api/database';

// add (create) column
export const addColumn = (boardId, column) => {}

// add (create) columns
export const addColumns = async (boardId, columns) => {
  const promises = [];

  for (let i = 0; i < columns.length; i++) {
    const addedColumn = addDocument(COLLECTION_COLUMNS_ID, {boardId, name: columns[i].value});
    promises.push(addedColumn);
  }

  let addedColumns = await Promise.all(promises);
  
  // add tasks prop to each column
  addedColumns = addedColumns.map(addedColumn => ({...addedColumn, tasks: []}))

  return addedColumns;

  // da li sada ovde da ova f-ja vrati ovu vrednosti

  // isto tako neki loader bi trebao da bude na dugmetu
}

// manage columns
export const manageColumns = (boardId, columns, currentBoardColumns) => {
  
}