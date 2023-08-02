import Dexie from 'dexie';

export const db = new Dexie('MyEmaxDB');

db.version(1).stores({
  users: '++id,username',
});

db.open().catch((error) => {
  console.error(`Error opening database: ${error}`);
});

export default db;