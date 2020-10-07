import { DiskDB } from "../build";
import {IDBOptions} from '../build/interfaces'

const coll = (new Date().getDate()+1).toString();

let options: IDBOptions ={
  collections: [coll],
  compress: true,
  path: __dirname + '/mydb/test',
};
const db = new DiskDB(options);

(async() => {
  //adding doc to collection
  const DB = await db.loadCollections();
   await DB.addDocumentToCollection(coll, [{
    "author": "author 10",
    "isbn": "1010",
    "name": "book 10"
  }, {
    "author": "author 9",
    "isbn": "999",
    "name": "book 9"
  }]);

  console.log(DB.store.get(coll));
  console.log(DB.store.get(coll)?.documents);
  console.log(DB.store.get(coll)?.documents.length);

  //find current collection
  console.log('Names of all the collections in DB',await DB.findCollections());

   //finding  document by ID from given collection
  console.log('Find doc with ID',DB.findDocumentFromCollectionByID(coll,'lCQfBmtaBaF9la0nDtzvp'));

  // //find collection by ID
  console.log('Find collection',DB.findOneCollection(coll))

  // // removing single document from collection
  DB.removeDocumentFromCollection(coll,'CytkyhG5rC_pSOSuY9ICH')
  console.log('checking if the doc was deleted from collection',DB.findOneCollection(coll))
  console.log('documents after deleting ' ,DB.store.get(coll)?.documents); 

  // // Testing delete
  //DB.delete(coll);
})();
