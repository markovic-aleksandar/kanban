import { Client, Databases } from 'appwrite';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_BOARDS_ID = import.meta.env.VITE_COLLECTION_BOARDS_ID;
const COLLECTION_COLUMNS_ID = import.meta.env.VITE_COLLECTION_COLUMNS_ID;
const COLLECTION_TASKS_ID = import.meta.env.VITE_COLLECTION_TASKS_ID;

const client = new Client();
client
  .setEndpoint(API_ENDPOINT)
  .setProject(PROJECT_ID);

const database = new Databases(client);

export {
  DATABASE_ID,
  COLLECTION_BOARDS_ID,
  COLLECTION_COLUMNS_ID,
  COLLECTION_TASKS_ID,
  database,
};