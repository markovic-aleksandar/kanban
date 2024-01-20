import { ID, Query } from 'appwrite';
import { DATABASE_ID, database } from '../appwriteConfig';
import { formatDatabaseQueries } from '../utils';

// get documents from specific collection
export const getDocuments = async (collectionId, queryOptions = null) => {
  const queries = formatDatabaseQueries(Query, queryOptions);

  try {
    const response = await database.listDocuments(DATABASE_ID, collectionId, queries);
    const responseData = response.documents;

    return responseData;
  }
  catch (error) {
    throw new Error(error);
  }
}

// add document to specific collection
export const addDocument = async (collectionId, data) => {
  try {
    const responseData = await database.createDocument(DATABASE_ID, collectionId, ID.unique(), data);
    return responseData;
  }
  catch (error) {
    throw new Error(error);
  }
}

// update document inside specific collection
export const updateDocument = async (collectionId, documentId, data) => {
  try {
    const responseData = await database.updateDocument(DATABASE_ID, collectionId, documentId, data);
    return responseData;
  }
  catch (error) {
    throw new Error(error);
  }
}

// delete document from specific collection
export const deleteDocument = async (collectionId, documentId) => {
  try {
    await database.deleteDocument(DATABASE_ID, collectionId, documentId);
    return null;
  }
  catch (error) {
    throw new Error(error);
  }
}