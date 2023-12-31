import { COLLECTION_BOARDS_ID, COLLECTION_COLUMNS_ID, COLLECTION_TASKS_ID } from '../appwriteConfig';
import { getDocuments } from '../api/database';
import { SET_BOARDS, ADD_BOARD, UPDATE_BOARD } from '../store/slices/boardSlice';

// get all boards from db
export const getBoards = async () => {
  // get all boards
  const boards = await getDocuments(COLLECTION_BOARDS_ID);
  
  // check for the current board inside local storage otherwise use the first board from a list
  const currentBoard = boards[0];

  // get all columns for specific board
  const columnsQueryOptions = { equal: ['boardId', [currentBoard.$id]] }
  currentBoard.boardColumns = await getDocuments(COLLECTION_COLUMNS_ID, columnsQueryOptions);

  // get all tasks for all columns  
  currentBoard.boardColumns.forEach(async boardColumn => {
    const taskQueryOptions = { equal: ['columnId', [boardColumn.$id]] }
    boardColumn.tasks = await getDocuments(COLLECTION_TASKS_ID, taskQueryOptions);
  });

  console.log(currentBoard);
}