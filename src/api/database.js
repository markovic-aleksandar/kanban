import { ID, Query } from 'appwrite';
import { DATABASE_ID, database } from '../appwriteConfig';
import { formatDatabaseQueries } from '../utils';

// get documents from specific collection
export const getDocuments = async (collectionID, queryOptions = null) => {
  const queries = formatDatabaseQueries(Query, queryOptions);

  try {
    const response = await database.listDocuments(DATABASE_ID, collectionID, queries);
    const responseData = response.documents;

    return responseData;
  }
  catch (error) {
    throw new Error(error);
  }
}

// add document to specific collection
export const addDocument = async (collectionID, document) => {
  try {
    const responseData = await database.createDocument(DATABASE_ID, collectionID, ID.unique(), document);
    return responseData;
  }
  catch (error) {
    throw new Error(error);
  }
}