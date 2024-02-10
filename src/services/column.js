import { 
  COLLECTION_COLUMNS_ID, 
  COLLECTION_TASKS_ID,
  COLLECTION_SUBTASKS_ID
} from '../appwriteConfig';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../api/database';
import {
  SET_CURRENT_BOARD_COLUMN, 
  SET_CURRENT_BOARD_COLUMNS,
  CURRENT_BOARD_UPDATE_COLUMNS
} from '../store/slices/boardSlice';
import { switchModal } from './modal';
import { delayToHandle } from '../utils';

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
      let columnTasks = [];
    
      if (currentColumn.$index || currentColumn.$index === 0) {
        columnTasks = column.tasks.filter(task => task.$id !== currentTask.$id);
        columnTasks.splice(currentColumn.$index, 0, currentTask);
      } else {
        columnTasks = column.tasks.map(task => task.$id === currentTask.$id ? currentTask : task);
      }
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
      const columnTasks = [...column.tasks];
      if (currentColumn.$index || currentColumn.$index === 0) {
        columnTasks.splice(currentColumn.$index, 0, newCurrentTask);
      } else {
        columnTasks.push(newCurrentTask);
      }
      return {...column, tasks: columnTasks};
    }

    return column;
  });
}

// add new column
export const addNewColumn = async (hooks, formData, currentBoard) => {
  const {dispatch, setLoading} = hooks;
  const {value: columnsData} = formData.columns;

  // show loading
  setLoading(true);

  // manage columns data
  const columns = await manageColumns(columnsData, currentBoard.$id, currentBoard.columns);
  
  // set current board columns state
  dispatch(SET_CURRENT_BOARD_COLUMNS(columns));

  // hide modal
  switchModal(dispatch);

  // hide loading
  delayToHandle(() => setLoading(false), 300);
}

// add new task
export const addNewTask = async (hooks, formData) => {
  const {dispatch, setLoading} = hooks;
  const {title: {value: title}, description: {value: description}, subtasks: {value: subtasks}, status: {value: currentColumn}} = formData;

  // show loading
  setLoading(true);

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

  // set current board columns state
  dispatch(SET_CURRENT_BOARD_COLUMN(updatedColumn));

  // hide modal
  switchModal(dispatch);

  // hide loading
  delayToHandle(() => setLoading(false), 300);
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
  
  // manage current task column
  const columns = manageTaskColumn({...currentTask, subtasks: formatedSubtasks}, currentColumn, currentBoardColumns);
  
  // current board update columns state
  dispatch(CURRENT_BOARD_UPDATE_COLUMNS(columns));
  
  // update current task inside db
  updateDocument(COLLECTION_TASKS_ID, currentTask.$id, {
    column: currentColumn.$id,
    columnId: currentColumn.$id,
    status: currentColumn.name,
    subtasks: formatedSubtasks
  });
}

// edit task
export const editTask = async (hooks, formData, currentTask, currentBoardColumns) => {
  const {dispatch, setLoading} = hooks;
  const {
    title: {value: title},
    description: {value: description},
    subtasks: {value: subtasks},
    status: {value: currentColumn}
  } = formData;
  const formatedSubtasks = [];

  // show loading
  setLoading(true);

  // mark deleted subtasks if are exist
  const deletedSubtasks = currentTask.subtasks.reduce((total, currentSubtask) => {
    if (!subtasks.find(subtask => subtask.$id === currentSubtask.$id)) total = [...total, {
      ...currentSubtask,
      action: 'delete'
    }];
    return total;
  }, []);

  // concat sent subtasks with deleted subtasks
  const tempSubtasks = subtasks.concat(deletedSubtasks);

  // format subtasks and delete all tasks with action delete from db if are exist
  for (let i = 0; i < tempSubtasks.length; i++) {
    const tempSubtask = tempSubtasks[i];
    
    // check if exists task with action "delete"
    if (tempSubtask?.action === 'delete') {
      await deleteDocument(COLLECTION_SUBTASKS_ID, tempSubtask.$id);
      continue;
    }

    // format the rest subtasks
    if (tempSubtask.$id) {
      const formatedSubtask = {...tempSubtask, title: tempSubtask.value};
      // delete value and error props
      delete formatedSubtask.value;
      delete formatedSubtask.error;
      formatedSubtasks.push(formatedSubtask);
      continue;
    }

    formatedSubtasks.push({
      title: tempSubtask.value,
      complete: false
    });
  }

  // update current task inside db
  const updatedCurrentTask = await updateDocument(COLLECTION_TASKS_ID, currentTask.$id, {
    title,
    description,
    column: currentColumn.$id,
    columnId: currentColumn.$id,
    status: currentColumn.name,
    subtasks: formatedSubtasks
  });

  // manage current task column
  const columns = manageTaskColumn({...currentTask, title, description, subtasks: updatedCurrentTask.subtasks}, currentColumn, currentBoardColumns);
  
  // current board update columns state
  dispatch(CURRENT_BOARD_UPDATE_COLUMNS(columns))

  // hide modal
  switchModal(dispatch);

  // hide loading
  delayToHandle(() => setLoading(false), 300);
}

// delete task
export const deleteTask = async (hooks, currentTask, currentBoardColumns) => {
  const {dispatch, setLoading} = hooks;
  
  // show loading
  setLoading(true);

  // delete task from db
  await deleteDocument(COLLECTION_TASKS_ID, currentTask.$id);
  
  // manage task column
  const columns = manageTaskColumn(currentTask, {$id: null}, currentBoardColumns);

  // current board update columns state
  dispatch(CURRENT_BOARD_UPDATE_COLUMNS(columns));

  // hide modal
  switchModal(dispatch);

  // hide loading
  delayToHandle(() => setLoading(false), 300);
}

// move task
export const moveTask = (dispatch, result, currentBoardColumns) => {
  const {draggableId, destination, source} = result;

  // prevent move for unknown destination and for the same position
  if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

  // get current task
  const currentTask = currentBoardColumns.reduce((total, column) => {
    const targetTask = column.tasks.find(task => task.$id === draggableId);
    if (targetTask) total = {...targetTask};
    return total; 
  }, null);

  // manage task column
  const columns = manageTaskColumn(currentTask, {$id: destination.droppableId, $index: destination.index}, currentBoardColumns);

  // current board update columns state
  dispatch(CURRENT_BOARD_UPDATE_COLUMNS(columns));

  // update target columns inside db
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    const isTargetColumn = currentTask.columnId === destination.droppableId ? column.$id === destination.droppableId : column.$id === currentTask.columnId || column.$id === destination.droppableId;

    if (isTargetColumn) updateDocument(COLLECTION_COLUMNS_ID, column.$id, {tasks: column.tasks});
  }
}