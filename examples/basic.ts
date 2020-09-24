import { DiskDB } from "../build";

const coll = (+new Date).toString();
const db = new DiskDB({
    collections: [coll],
    compress: true,
    encrypt: false,
    path: __dirname + '/mydb',
});

(async() => {
    const { store } = await db.loadCollections();
    // tslint:disable-next-line: no-console
    console.log(store.get(coll));
})();
