import { DiskDB } from '../src/index';
import { IDBOptions } from '../src/interfaces';
describe('DISKDB: ', () => {
  let options : IDBOptions= {
    collections: ['books'],
    compress: true,
    path: __dirname + '/mydb/test',
  }
  let DB = new DiskDB(options);

  beforeEach(() => {
    jest.resetModules();
  });

  test('Should have DiskDB available', () => {
    expect(DiskDB).toBeDefined();
  });

  test('Should be able to create an instance of DiskDB', () => {
    expect(DB).toBeInstanceOf(DiskDB);
    expect(DB.loadCollections).toBeDefined();
    expect(DB.addDocumentToCollection).toBeDefined();
    expect(DB.findCollections).toBeDefined();
    expect(DB.findDocumentFromCollectionByID).toBeDefined();
    expect(DB.findOneCollection).toBeDefined();
    expect(DB.delete).toBeDefined();
    expect(DB.removeDocumentFromCollection).toBeDefined();
  });

  test('Should be able to add an array of documents to collection',async()=>{
  var db = await DB.loadCollections();
  await db.addDocumentToCollection('books', [{
      "author": "author 3",
      "isbn": "333333333333",
      "name": "book 3"
    }, {
      "author": "author 2",
      "isbn": "999999999",
      "name": "book 2"
    }]);
    expect(db.store.get('books')?.documents.length).toBeGreaterThan(0);
  })

  test('Should not be able to add an array of documents to non existing collection',async()=>{
    var db = await DB.loadCollections();
      expect(await db.addDocumentToCollection('users', [{
        "name": "Mary",
        "age":"54"
      }, {
        "name": "John",
        "age":"60"
      }])).toBeFalsy();
    })

    test('Should be able to add a single document to collection',async()=>{
      var db = await DB.loadCollections();
      expect(await db.addDocumentToCollection('books',  {
        "name": "book 2",
        "author": "author 2"
      })).toBeTruthy();
    })

    test('Should be able to fetch collection',async()=>{
     var db = await DB.loadCollections();
      expect((await db.findCollections()).length).toBeGreaterThanOrEqual(0);
    })

    test('Should be able to fetch a specific document from collection',async()=>{
      var db = await DB.loadCollections();
      expect(db.findDocumentFromCollectionByID('books','JReN4yYbxa8dRqP5z7cxl')).toBeTruthy();
    })

    test('Should not be able to access a document from non existing collection',async()=>{
      var db = await DB.loadCollections();
      expect(db.findDocumentFromCollectionByID('xyz','E770Qnw8idGmfsKKsJidC')).toBeFalsy();
    })

    test('Should be able to delete a specific document from collection',async()=>{
      var db = await DB.loadCollections();
      expect(db.removeDocumentFromCollection('books','E770Qnw8idGmfsKKsJidC')).toBeTruthy();
    }) 

    test('Should not be able to delete a doc from non existing collection',async()=>{
      var db = await DB.loadCollections();
      expect(db.removeDocumentFromCollection('book','E770Qnw8idGmfsKKsJidC')).toMatchObject({});
    }) 
    test('Should not be able to delete non existent collection',async()=>{
      var db = await DB.loadCollections();
      expect(db.delete('book')).toBeFalsy();
    });
    test('Should be able to delete a collection',async()=>{
      var db = await DB.loadCollections();
      expect(db.delete('books')).toBeTruthy();
    });
  });
