import { COLLECTION_COLUMNS_ID } from '../appwriteConfig';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../api/database';
import { SET_CURRENT_BOARD_COLUMN, SET_CURRENT_BOARD_COLUMNS } from '../store/slices/boardSlice';
import { switchModal } from './modal';

// get columns
export const getColumns = async boardId => {
  // get all columns for specific board
  const columnsQueryOptions = {equal: ['boardId', [boardId]]}
  return await getDocuments(COLLECTION_COLUMNS_ID, columnsQueryOptions);
}

// manage columns
export const manageColumns = async (columns, currentBoardId, currentBoardColumns) => {
  let columnsRequest = [...columns];
  const promises = [];

  // check columns for update or delete
  if (currentBoardColumns) {
    for (let i = 0; i < currentBoardColumns.length; i++) {
      const currentBoardColumn = currentBoardColumns[i];
    
      const foundColumn = columns.reduce((total, column, columnIndex) => {
        if (column.$id === currentBoardColumn.$id) total = {index: columnIndex, item: column};
        return total;
      }, {index: null, item: null});

      if (foundColumn.item) { // for update
        // columnsRequest.splice(foundColumn.index, 1, {...currentBoardColumn, value: foundColumn.item.value, action: 'update'});
        columnsRequest.splice(foundColumn.index, 1, {...foundColumn.item, action: 'update'});
      } else { // for delete
        columnsRequest.push({...currentBoardColumn, action: 'delete'});
      }
    }
  }

  for (let i = 0; i < columnsRequest.length; i++) {
    const currentColumnRequest = columnsRequest[i];

    // check for update document
    if (currentColumnRequest.action && currentColumnRequest.action === 'update') {
      const updatedDoc = await updateDocument(COLLECTION_COLUMNS_ID, currentColumnRequest.$id, {
        name: currentColumnRequest.value || currentColumnRequest.name, 
        tasks: currentColumnRequest.tasks
      });
      promises.push(updatedDoc);
      continue;
    }

    // check for delete document
    if (currentColumnRequest.action && currentColumnRequest.action === 'delete') {
      await deleteDocument(COLLECTION_COLUMNS_ID, currentColumnRequest.$id);
      continue;
    }

    // add document
    const addedDoc = await addDocument(COLLECTION_COLUMNS_ID, {boardId: currentBoardId, name: currentColumnRequest.value});
    promises.push(addedDoc);
  }

  return promises;
}

// manage task column
const manageTaskColumn = (currentTask, currentColumn, columns) => {
  return columns.map(column => {
    // update inside the same column
    if (currentTask.columnId === currentColumn.$id && column.$id === currentColumn.$id) {
      const columnTasks = column.tasks.map(task => task.$id === currentTask.$id ? currentTask : task);
      return {...column, tasks: columnTasks};
    }

    // delete from the prev column
    if (currentTask.columnId !== currentColumn.$id && column.$id === currentTask.columnId) {
      const columnTasks = column.tasks.filter(task => task.$id !== currentTask.$id);
      return {...column, tasks: columnTasks};
    }

    // add inside the new column
    if (currentTask.columnId !== currentColumn.$id && column.$id === currentColumn.$id) {
      const newCurrentTask = {...currentTask, columnId: column.$id, status: column.name};
      return {...column, tasks: [...column.tasks, newCurrentTask]};
    }

    return column;
  });
}

// add new column
export const addNewColumn = async (dispatch, formData, currentBoard) => {
  const {value: columnsData} = formData.columns;

  // manage columns data
  const columns = await manageColumns(columnsData, currentBoard.$id, currentBoard.columns);

  // setup state
  dispatch(SET_CURRENT_BOARD_COLUMNS(columns));
  switchModal(dispatch);
}

// add new task
export const addNewTask = async (dispatch, formData) => {
  const {title: {value: title}, description: {value: description}, subtasks: {value: subtasks}, status: {value: currentColumn}} = formData;

  // create new task item
  const newTask = {
    columnId: currentColumn.$id,
    title,
    description,
    status: currentColumn.name,
    subtasks: subtasks.map(subtask => ({
      title: subtask.value,
      complete: false
    }))
  };

  // add created new task item to current column tasks
  const currentColumnTasks = [...currentColumn.tasks, newTask];

  // updated current column db
  const updatedColumn = await updateDocument(COLLECTION_COLUMNS_ID, currentColumn.$id, {tasks: currentColumnTasks});

  // setup state
  dispatch(SET_CURRENT_BOARD_COLUMN(updatedColumn));
  switchModal(dispatch);
}

// manage current task
export const manageCurrentTask = async (dispatch, formData, currentTask, currentBoardColumns) => {
  const {subtasks: {value: subtasks}, status: {value: currentColumn}} = formData;

  // format subtasks
  const formatedSubtasks = subtasks.map(subtask => {
    const tempSubtask = {...subtask};
    // delete error prop
    delete tempSubtask.error;
    return tempSubtask;
  });

  // updated current task
  const updatedCurrentTask = {
    ...currentTask,
    subtasks: formatedSubtasks
  };
  
  // manage current task column
  let columns = manageTaskColumn(updatedCurrentTask, currentColumn, currentBoardColumns);

  // manage columns
  columns = await manageColumns(columns, false, currentBoardColumns);

  // setup state
  dispatch(SET_CURRENT_BOARD_COLUMNS(columns));
}

// edit task
export const editTask = async (dispatch, formData, currentTask, currentBoardColumns) => {
  const {
    title: {value: title},
    description: {value: description},
    subtasks: {value: subtasks},
    status: {value: currentColumn}
  } = formData;

  // format subtasks
  const formatedSubtasks = subtasks.map(subtask => {
    if (subtask.$id) {
      const tempSubtask = {...subtask, title: subtask.value};
      // delete value and error props
      delete tempSubtask.value;
      delete tempSubtask.error;
      return tempSubtask;
    }

    return {title: subtask.value, complete: false};
  });

  // updated current task
  const updatedCurrentTask = {
    ...currentTask,
    title,
    description,
    subtasks: formatedSubtasks
  };

  // manage current task column
  let columns = manageTaskColumn(updatedCurrentTask, currentColumn, currentBoardColumns);

  // manage columns
  columns = await manageColumns(columns, false, currentBoardColumns);
  
  // setup state
  dispatch(SET_CURRENT_BOARD_COLUMNS(columns))
  switchModal(dispatch);
}