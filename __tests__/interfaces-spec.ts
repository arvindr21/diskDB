import { ICollection, IDBOptions, IDocument } from '../build/interfaces';

test('Should have ICollection available', () => {
  const coll: ICollection = {
    documents: [],
    name: '',
    path: '',
  };
  expect(coll.documents).toBeDefined();
  expect(coll.name).toBeDefined();
  expect(coll.path).toBeDefined();
});

test('Should have IDBOptions available', () => {
  const options: IDBOptions = {
    collections: [],
    compress: false,
    encrypt: false,
    path: '',
  };
  expect(options.collections).toBeDefined();
  expect(options.compress).toBeDefined();
  expect(options.encrypt).toBeDefined();
  expect(options.path).toBeDefined();
});

test('Should have IDocument available', () => {
  const document: IDocument = {
    _id: '',
    data: [],
    meta: {
      timestamp: 0,
      version: 0,
    },
  };
  expect(document._id).toBeDefined();
  expect(document.data).toBeDefined();
  expect(document.meta).toBeDefined();
  expect(document.meta.timestamp).toBeDefined();
  expect(document.meta.version).toBeDefined();
});
