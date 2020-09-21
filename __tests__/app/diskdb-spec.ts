import { DiskDB } from '../../src/app/diskdb';
import { EXT_JSON } from '../../src/lib/helpers/global';
let DB: DiskDB;
const collName = 'users';
const path = __dirname;

const users = [{name: 'a'}, {name: 'b'}]

beforeEach(() => {
  DB = new DiskDB(path, [collName]);
});

test('should return promise', async () => {
  expect(DB).toBeDefined();
  expect(DB.connect).toBeDefined();
  expect(DB.store).toBe(undefined);
});

test('should have one collection `users`', async () => {
  const store = await DB.connect();
  expect(store.size).toBe(1);
  expect(store.get(collName)).toBeDefined();
  expect(store.get(collName)?.name).toBe(collName);
  expect(store.get(collName)?.path).toBeDefined();
  expect(store.get(collName)?.path).toBe(path + '/' + collName + EXT_JSON);
});

// test('should be able read empty collection', async () => {
//   const store = await DB.connect();
//   expect(store.get(collName)?.documents).toBeDefined();
//   // expect(store.get(collName)?.documents?.length).toBe(0);
//   console.log(store.get(collName)?.documents)
// });

// test('should be able to write a document', async() =>{
//   const store = await DB.connect();
//   store.set(collName, users);
// });
