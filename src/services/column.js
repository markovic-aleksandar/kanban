import { COLLECTION_COLUMNS_ID } from '../appwriteConfig';
import { getDocuments, addDocument } from '../api/database';


// get columns
export const getColumns = async boardId => {
  // get all columns for specific board
  const columnsQueryOptions = { equal: ['boardId', [boardId]] }
  return await getDocuments(COLLECTION_COLUMNS_ID, columnsQueryOptions);
}

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
export const manageColumns = async (boardId, columns, currentBoardColumns) => {
  // ova f-ja ce se zvati svaki put pri kreiranju, aziriranju i brisanju kolona iz baze
 
  const promises = [];

  for (let i = 0; i < columns.length; i++) {
    const addedColumn = addDocument(COLLECTION_COLUMNS_ID, {boardId, name: columns[i].value});
    promises.push(addedColumn);
  }

  return await Promise.all(promises);
}