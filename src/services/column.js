import { COLLECTION_COLUMNS_ID } from '../appwriteConfig';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../api/database';
import { SET_CURRENT_BOARD_COLUMNS } from '../store/slices/boardSlice';
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
        columnsRequest.splice(foundColumn.index, 1, {...currentBoardColumn, value: foundColumn.item.value, action: 'update'});
      } else { // for delete
        columnsRequest.push({...currentBoardColumn, action: 'delete'});
      }
    }
  }

  for (let i = 0; i < columnsRequest.length; i++) {
    const currentColumnRequest = columnsRequest[i];

    // check for update document
    if (currentColumnRequest.action && currentColumnRequest.action === 'update') {
      const updatedDoc = await updateDocument(COLLECTION_COLUMNS_ID, currentColumnRequest.$id, {name: currentColumnRequest.value});
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

// add new column
export const addNewColumn = async (dispatch, formData, currentBoard) => {
  const {value: columnsData} = formData.columns;

  // manage columns data
  const columns = await manageColumns(columnsData, currentBoard.$id, currentBoard.columns);

  // setup state
  dispatch(SET_CURRENT_BOARD_COLUMNS(columns));
  switchModal(dispatch);
}