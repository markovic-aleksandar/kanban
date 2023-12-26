import { Client, Databases } from 'appwrite';

const client = Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('658b2b0b02cd8078b13d');

export const db = new Databases(client);