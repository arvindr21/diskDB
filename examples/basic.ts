import { DiskDB } from "../build";

const coll = (+new Date).toString();
const db = new DiskDB({
    collections: [coll],
    compress: true,
    encrypt: false,
    path: __dirname + '/mydb',
});

(async() => {
    const DB = await db.loadCollections();
    // tslint:disable: no-console
    console.log(DB.store.get(coll));

    DB.addDocumentToCollection(coll, {
      "author": "author 1",
      "isbn": "93763782929992",
      "name": "book 1"
    });

    console.log(DB.store.get(coll));
    console.log(DB.store.get(coll)?.documents);
    console.log('EXISTS >>>', DB.store.get(coll)?.documents.filter((d) => d.data.author === 'author 1'));
    console.log('DOES NOT EXISTS >>>',DB.store.get(coll)?.documents.filter((d) => d.data.author === 'Arvind'));

})();
