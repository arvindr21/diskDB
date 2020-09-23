import { DiskDB } from '../src/index';
describe('DISKDB: ', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Should have DiskDB available', () => {
    expect(DiskDB).toBeDefined();
  });

  test('Should be able to create an instance of DiskDB', () => {
    const DB = new DiskDB({
      collections: ['books'],
      compress: true,
      encrypt: false,
      path: __dirname,
    });

    expect(DB).toBeInstanceOf(DiskDB);
    expect(DB.loadCollections).toBeDefined();
    expect(DB.addDocumentToCollection).toBeDefined();
    expect(DB.findCollections).toBeDefined();
    expect(DB.findDocumentFromCollectionByID).toBeDefined();
    expect(DB.findOneCollection).toBeDefined();
    expect(DB.removeCollection).toBeDefined();
    expect(DB.removeDocumentFromCollection).toBeDefined();
  });
});
